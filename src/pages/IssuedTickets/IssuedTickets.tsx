import { Button, IconButton, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import dayjs from 'dayjs';
import { useStore } from 'effector-react';
import MaterialTable, { Column, Options } from 'material-table';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { NotificationSeverity, ROUTES } from '../../constants';
import { showNotification } from '../../effector/notification/index';
import {
  $tickets,
  deleteTicketFx,
  getTicketsFx,
  setIsAlreadyUsedFx,
} from '../../effector/tickets/index';
import './style.scss';

const tableOptions: Options<any> = {
  detailPanelType: 'single',
  paginationType: 'stepped',
  pageSizeOptions: [],
  showTitle: false,
  draggable: false,
  thirdSortClick: false,
};

const IssuedTickets: React.FC = () => {
  const { t } = useTranslation();
  const tickets = useStore($tickets);

  useEffect(() => {
    getTicketsFx();
  }, []);

  const tableData = useMemo(
    () =>
      tickets.map(ticket => {
        return {
          ...ticket,
          issuedAt: dayjs(ticket.issuedAt).format('lll'),
          updatedAt: dayjs(ticket.updatedAt).format('lll'),
          issueMethod: t(
            `pages.issuedTickets.issueMethods.${ticket.issueMethod}`
          ),
        };
      }),
    [tickets, t]
  );

  const tableDetailPanel = useCallback(
    (rowData: any) => (
      <div className='detailPanel'>
        <div className='detailPanel__infoSection'>
          <span>{`${t('common.labels.issuedAt')}: ${rowData.issuedAt}`}</span>
          <span>{`${t('common.labels.updatedAt')}: ${rowData.updatedAt}`}</span>
          <span>{`${t('pages.issuedTickets.labels.issueMethod')}: ${
            rowData.issueMethod
          }`}</span>
        </div>
        <IconButton
          onClick={() => {
            deleteTicketFx({ number: rowData.number })
              .then(() =>
                showNotification({
                  severity: NotificationSeverity.SUCCESS,
                  message: t(
                    'pages.issuedTickets.messages.ticketIsDeletedSuccessfully'
                  ),
                })
              )
              .then(() => getTicketsFx());
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
    [t]
  );

  const tableLocalization = useMemo(
    () => ({
      body: {
        emptyDataSourceMessage: t(
          'pages.issuedTickets.table.body.emptyDataSourceMessage'
        ),
      },
      pagination: {
        firstTooltip: t('pages.issuedTickets.table.pagination.firstTooltip'),
        previousTooltip: t(
          'pages.issuedTickets.table.pagination.previousTooltip'
        ),
        nextTooltip: t('pages.issuedTickets.table.pagination.nextTooltip'),
        lastTooltip: t('pages.issuedTickets.table.pagination.lastTooltip'),
      },
      toolbar: {
        searchTooltip: t('pages.issuedTickets.table.toolbar.searchTooltip'),
        searchPlaceholder: t(
          'pages.issuedTickets.table.toolbar.searchPlaceholder'
        ),
      },
    }),
    [t]
  );

  const tableColumns: Column<any>[] = useMemo(
    () => [
      {
        title: t('common.labels.number'),
        field: 'number',
        defaultSort: 'asc',
      },
      {
        title: t('pages.issuedTickets.labels.isAlreadyUsed'),
        field: 'isAlreadyUsed',
        searchable: false,
        type: 'boolean',
        render: (rowData: any) => (
          <Switch
            checked={rowData.isAlreadyUsed}
            id={rowData.number}
            onChange={() => {
              setIsAlreadyUsedFx({
                number: rowData.number,
                isAlreadyUsed: !rowData.isAlreadyUsed,
              })
                .then(() =>
                  showNotification({
                    severity: NotificationSeverity.SUCCESS,
                    message: t(
                      `pages.issuedTickets.messages.setIsAlreadyUsedSuccess.${!rowData.isAlreadyUsed}`
                    ),
                  })
                )
                .then(() => getTicketsFx());
            }}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <MaterialTable
        columns={tableColumns}
        data={tableData}
        options={tableOptions}
        detailPanel={tableDetailPanel}
        localization={tableLocalization}
      />
      <Button
        variant='contained'
        className={'issuedTickets__button'}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

export default IssuedTickets;
