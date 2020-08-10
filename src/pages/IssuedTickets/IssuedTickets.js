import { Button, IconButton, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { showNotification } from '../../components/Notification/action';
import { ROUTES, NOTIFICATION_SEVERITIES } from '../../constants';
import { deleteTicket, getTickets, setIsAlreadyUsed } from './action';
import './style.scss';

const IssuedTickets = ({
  getTickets: getTicketsAlias,
  setIsAlreadyUsed: setIsAlreadyUsedAlias,
  deleteTicket: deleteTicketAlias,
  showNotification: showNotificationAlias,
  tickets,
}) => {
  useEffect(() => { getTicketsAlias(); }, []);
  const tableData = useMemo(() => tickets.map((ticket) => ({
    ...ticket,
    issuedAt: format(ticket.issuedAt, 'yyyy-MM-dd HH:mm'),
    updatedAt: format(ticket.updatedAt, 'yyyy-MM-dd HH:mm'),
    issueMethod: I18n.t(`pages.issuedTickets.issueMethods.${ticket.issueMethod}`),
  })), [tickets]);
  const tableDetailPanel = (rowData) => (
    <div className="detailPanel">
      <div className="detailPanel__infoSection">
        <span>{`${I18n.t('common.labels.issuedAt')}: ${rowData.issuedAt}`}</span>
        <span>{`${I18n.t('common.labels.updatedAt')}: ${rowData.updatedAt}`}</span>
        <span>{`${I18n.t('pages.issuedTickets.labels.issueMethod')}: ${rowData.issueMethod}`}</span>
      </div>
      <IconButton
        onClick={() => {
          deleteTicketAlias(rowData.number)
            .then(() => showNotificationAlias(
              NOTIFICATION_SEVERITIES.SUCCESS,
              I18n.t('pages.issuedTickets.messages.ticketIsDeletedSuccessfully'),
            ))
            .then(() => getTicketsAlias());
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
  const tableOptions = {
    detailPanelType: 'single',
    paginationType: 'stepped',
    pageSizeOptions: [],
    showTitle: false,
    draggable: false,
    thirdSortClick: false,
  };
  const tableLocalization = {
    body: {
      emptyDataSourceMessage: I18n.t('pages.issuedTickets.table.body.emptyDataSourceMessage'),
    },
    pagination: {
      firstTooltip: I18n.t('pages.issuedTickets.table.pagination.firstTooltip'),
      previousTooltip: I18n.t('pages.issuedTickets.table.pagination.previousTooltip'),
      nextTooltip: I18n.t('pages.issuedTickets.table.pagination.nextTooltip'),
      lastTooltip: I18n.t('pages.issuedTickets.table.pagination.lastTooltip'),
    },
    toolbar: {
      searchTooltip: I18n.t('pages.issuedTickets.table.toolbar.searchTooltip'),
      searchPlaceholder: I18n.t('pages.issuedTickets.table.toolbar.searchPlaceholder'),
    },
  };
  const tableColumns = [
    {
      title: I18n.t('common.labels.number'),
      field: 'number',
      defaultSort: 'asc',
    },
    {
      title: I18n.t('pages.issuedTickets.labels.isAlreadyUsed'),
      field: 'isAlreadyUsed',
      searchable: false,
      type: 'boolean',
      render: (rowData) => (
        <Switch
          checked={rowData.isAlreadyUsed}
          id={rowData.number}
          onChange={() => {
            setIsAlreadyUsedAlias(rowData.number, !rowData.isAlreadyUsed)
              .then(() => showNotificationAlias(
                NOTIFICATION_SEVERITIES.SUCCESS,
                I18n.t(`pages.issuedTickets.messages.setIsAlreadyUsedSuccess.${
                  !rowData.isAlreadyUsed
                }`),
              ))
              .then(() => getTicketsAlias());
          }}
        />
      ),
    },
  ];
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
        variant="contained"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {I18n.t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  tickets: state.issuedTicketsReducer.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: bindActionCreators(getTickets, dispatch),
  setIsAlreadyUsed: bindActionCreators(setIsAlreadyUsed, dispatch),
  deleteTicket: bindActionCreators(deleteTicket, dispatch),
  showNotification: bindActionCreators(showNotification, dispatch),
});

IssuedTickets.propTypes = {
  getTickets: PropTypes.func.isRequired,
  setIsAlreadyUsed: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string.isRequired,
    issuedAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    issueMethod: PropTypes.string.isRequired,
    isAlreadyUsed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuedTickets);
