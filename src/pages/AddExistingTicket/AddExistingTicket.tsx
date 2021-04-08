import DayjsUtils from '@date-io/dayjs';
import { Button, TextField } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import i18next from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { NotificationSeverity, ROUTES } from '../../constants';
import { showNotification } from '../../effector/notification/index';
import {
  addExistingTicketFx,
  getTicketsFx,
} from '../../effector/tickets/index';
import {
  isEmptyOrNumberString,
  isSixDigitNumberString,
} from '../../utils/validators';
import './style.scss';

const AddExistingTicket: React.FC = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState('');

  const [
    selectedIssuedAtDateTime,
    handleIssuedAtDateTimeChange,
  ] = useState<Date | null>(new Date());

  const [
    selectedUpdatedAtDateTime,
    handleUpdatedAtDateTimeChange,
  ] = useState<Date | null>(new Date());

  useEffect(() => {
    setNumber('');
    handleIssuedAtDateTimeChange(new Date());
    handleUpdatedAtDateTimeChange(new Date());
  }, []);

  const onAddButtonClick = useCallback(() => {
    getTicketsFx().then(tickets => {
      if (tickets.find(ticket => ticket.number === number)) {
        showNotification({
          severity: NotificationSeverity.ERROR,
          message: t('pages.addExistingTicket.messages.numberAlreadyExists'),
        });
      } else if (
        selectedIssuedAtDateTime !== null &&
        selectedUpdatedAtDateTime !== null
      ) {
        addExistingTicketFx({
          number,
          issuedAt: selectedIssuedAtDateTime,
          updatedAt: selectedUpdatedAtDateTime,
        }).then(() =>
          showNotification({
            severity: NotificationSeverity.SUCCESS,
            message: t(
              'pages.addExistingTicket.messages.ticketIsAddedSuccessfully'
            ),
          })
        );
      }
    });
  }, [number, selectedIssuedAtDateTime, selectedUpdatedAtDateTime, t]);

  const onNumberChange = useCallback(e => {
    const { value } = e.target;
    if (isEmptyOrNumberString(value)) {
      setNumber(value);
    }
  }, []);

  const onIssuedAtChange = useCallback(
    (date: MaterialUiPickersDate) =>
      handleIssuedAtDateTimeChange(date?.toDate() ?? null),
    []
  );

  const onUpdatedAtChange = useCallback(
    (date: MaterialUiPickersDate) =>
      handleUpdatedAtDateTimeChange(date?.toDate() ?? null),
    []
  );

  const numberInputProps = useMemo(
    () => ({
      maxLength: 6,
      onKeyUp: (
        e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        if (e.key === 'Enter' && number.length === 6) {
          e.preventDefault();
          onAddButtonClick();
        }
      },
    }),
    [number.length, onAddButtonClick]
  );

  return (
    <>
      <TextField
        label={t('common.labels.number')}
        variant='outlined'
        className={'addExistingTicket__input'}
        value={number}
        inputProps={numberInputProps}
        onChange={onNumberChange}
      />
      <MuiPickersUtilsProvider
        utils={DayjsUtils}
        locale={i18next.language ?? 'en'}
      >
        <DateTimePicker
          okLabel={t('pages.addExistingTicket.buttons.ok')}
          cancelLabel={t('pages.addExistingTicket.buttons.cancel')}
          todayLabel={t('pages.addExistingTicket.buttons.today')}
          showTodayButton
          label={t('common.labels.issuedAt')}
          ampm={false}
          disableFuture
          format={'lll'}
          inputVariant='outlined'
          value={selectedIssuedAtDateTime}
          className={'addExistingTicket__dateTimePicker'}
          onChange={onIssuedAtChange}
        />
        <DateTimePicker
          okLabel={t('pages.addExistingTicket.buttons.ok')}
          cancelLabel={t('pages.addExistingTicket.buttons.cancel')}
          todayLabel={t('pages.addExistingTicket.buttons.today')}
          showTodayButton
          label={t('common.labels.updatedAt')}
          ampm={false}
          disableFuture
          format={'lll'}
          inputVariant='outlined'
          value={selectedUpdatedAtDateTime}
          className={'addExistingTicket__dateTimePicker'}
          onChange={onUpdatedAtChange}
        />
      </MuiPickersUtilsProvider>
      <Button
        variant='contained'
        className={'addExistingTicket__button'}
        onClick={onAddButtonClick}
        disabled={
          number.length === 0 ||
          !isSixDigitNumberString(number) ||
          selectedUpdatedAtDateTime === null ||
          selectedIssuedAtDateTime === null ||
          selectedUpdatedAtDateTime < selectedIssuedAtDateTime
        }
      >
        {t('pages.addExistingTicket.buttons.add')}
      </Button>
      <Button
        variant='contained'
        className={'addExistingTicket__button'}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

export default AddExistingTicket;
