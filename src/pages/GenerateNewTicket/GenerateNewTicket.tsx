import { Button, TextField } from '@material-ui/core';
import { useStore } from 'effector-react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { NotificationSeverity, ROUTES } from '../../constants';
import { showNotification } from '../../effector/notification/index';
import {
  generateNewTicketFx,
  getTicketsFx,
} from '../../effector/tickets/index';
import { resetGeneratedTicketNumber } from '../../effector/tickets/index';
import { $generatedTicketNumber, $tickets } from '../../effector/tickets/index';
import './style.scss';

const GenerateNewTicket: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    resetGeneratedTicketNumber();
  }, []);

  const tickets = useStore($tickets);
  const generatedTicketNumber = useStore($generatedTicketNumber);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = useCallback(() => {
    if (inputRef?.current?.select) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  }, []);

  const numbers = useMemo(() => tickets.map(ticket => ticket.number), [
    tickets,
  ]);

  const onGenerateButtonClick = useCallback(() => {
    getTicketsFx()
      .then(() => generateNewTicketFx({ numbers }))
      .then(() =>
        showNotification({
          severity: NotificationSeverity.SUCCESS,
          message: t(
            'pages.generateNewTicket.messages.ticketIsGeneratedSuccessfully'
          ),
        })
      )
      .then(() => getTicketsFx());
  }, [numbers, t]);

  const numberInputProps = useMemo(
    () => ({
      ref: inputRef,
      readOnly: true,
      disabled: (generatedTicketNumber ?? '').length === 0,
    }),
    [generatedTicketNumber]
  );

  return (
    <>
      <TextField
        label={t('common.labels.number')}
        variant='outlined'
        className={'generateNewTicket__input'}
        inputProps={numberInputProps}
        value={generatedTicketNumber ?? ''}
      />
      <Button
        variant='contained'
        className={'generateNewTicket__button'}
        onClick={onGenerateButtonClick}
      >
        {t(
          `pages.generateNewTicket.buttons.generate${
            (generatedTicketNumber ?? '').length > 0 ? 'More' : ''
          }`
        )}
      </Button>
      <Button
        variant='contained'
        className={'generateNewTicket__button'}
        disabled={(generatedTicketNumber ?? '').length === 0}
        onClick={copyToClipboard}
      >
        {t('pages.generateNewTicket.buttons.copyToClipboard')}
      </Button>
      <Button
        variant='contained'
        className={'generateNewTicket__button'}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

export default GenerateNewTicket;
