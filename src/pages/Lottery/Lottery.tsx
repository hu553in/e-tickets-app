import { Button, TextField } from '@material-ui/core';
import { useStore } from 'effector-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
  $chosenTicketNumber,
  $tickets,
  getTicketsFx,
  resetChosenTicketNumber,
  setChosenTicketNumber,
} from '../../effector/tickets/index';
import { getRandomInteger } from '../../utils/math';
import './style.scss';

const Lottery: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    getTicketsFx();
    resetChosenTicketNumber();
  }, []);

  const tickets = useStore($tickets);
  const chosenTicketNumber = useStore($chosenTicketNumber);
  const [chosenTickets, setChosenTickets] = useState<string[]>([]);

  const onChooseButtonClick = useCallback(() => {
    if (tickets && tickets.length > chosenTickets.length) {
      let chosenTicketNumber = '';
      do {
        const newChosenTicketNumber =
          tickets?.[getRandomInteger(0, tickets.length)]?.number;
        if (newChosenTicketNumber) {
          chosenTicketNumber = newChosenTicketNumber;
        }
      } while (chosenTickets.includes(chosenTicketNumber));
      setChosenTickets([...chosenTickets, chosenTicketNumber]);
      setChosenTicketNumber(chosenTicketNumber);
    }
  }, [tickets, chosenTickets]);

  const onResetButtonClick = useCallback(() => {
    setChosenTickets([]);
    resetChosenTicketNumber();
  }, []);

  const numberInputProps = useMemo(
    () => ({
      readOnly: true,
      disabled: (chosenTicketNumber ?? '').length === 0,
    }),
    [chosenTicketNumber]
  );

  const noTickets = useMemo(() => tickets.length === 0, [tickets]);

  const noMoreTickets = useMemo(() => tickets.length === chosenTickets.length, [
    chosenTickets.length,
    tickets.length,
  ]);

  return (
    <>
      {!noTickets && (
        <TextField
          label={t('common.labels.number')}
          variant='outlined'
          className={'lottery__input'}
          inputProps={numberInputProps}
          value={chosenTicketNumber ?? ''}
        />
      )}
      <Button
        variant='contained'
        className={'lottery__button'}
        onClick={onChooseButtonClick}
        disabled={noTickets || noMoreTickets}
      >
        {t(
          `pages.lottery.buttons.${
            noTickets
              ? 'noTickets'
              : noMoreTickets
              ? 'noMoreTickets'
              : `choose${(chosenTicketNumber ?? '').length > 0 ? 'More' : ''}`
          }`
        )}
      </Button>
      {!noTickets && noMoreTickets && (
        <Button
          variant='contained'
          className={'lottery__button'}
          onClick={onResetButtonClick}
        >
          {t('pages.lottery.buttons.reset')}
        </Button>
      )}
      <Button
        variant='contained'
        className={'lottery__button'}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

export default Lottery;
