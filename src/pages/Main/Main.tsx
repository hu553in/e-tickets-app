import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { signOutFx } from '../../effector/auth';
import './style.scss';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const onSignOutButtonClick = useCallback(() => signOutFx(), []);

  return (
    <>
      <Button
        variant='contained'
        className={'main__button'}
        component={NavLink}
        exact
        to={ROUTES.ISSUE_TICKET}
      >
        {t('pages.main.buttons.issueTicket')}
      </Button>
      <Button
        variant='contained'
        className={'main__button'}
        component={NavLink}
        exact
        to={ROUTES.ISSUED_TICKETS}
      >
        {t('pages.main.buttons.issuedTickets')}
      </Button>
      <Button
        variant='contained'
        className={'main__button'}
        component={NavLink}
        exact
        to={ROUTES.LOTTERY}
      >
        {t('pages.main.buttons.lottery')}
      </Button>
      <Button
        variant='contained'
        className={'main__button'}
        onClick={onSignOutButtonClick}
      >
        {t('pages.main.buttons.signOut')}
      </Button>
    </>
  );
};

export default Main;
