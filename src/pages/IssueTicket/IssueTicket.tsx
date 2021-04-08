import { Button } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './style.scss';

const IssueTicket: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        variant='contained'
        className={'issueTicket__button'}
        component={NavLink}
        exact
        to={ROUTES.GENERATE_NEW_TICKET}
      >
        {t('pages.issueTicket.buttons.newTicket')}
      </Button>
      <Button
        variant='contained'
        className={'issueTicket__button'}
        component={NavLink}
        exact
        to={ROUTES.ADD_EXISTING_TICKET}
      >
        {t('pages.issueTicket.buttons.existingTicket')}
      </Button>
      <Button
        variant='contained'
        className={'issueTicket__button'}
        component={NavLink}
        exact
        to={ROUTES.DEFAULT}
      >
        {t('common.buttons.mainMenu')}
      </Button>
    </>
  );
};

export default IssueTicket;
