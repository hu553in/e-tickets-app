import { Button } from '@material-ui/core';
import React from 'react';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { app } from '../../services/firebase';

const Main = () => (
  <>
    <Button
      variant="contained"
      style={{ width: '200px' }}
      component={NavLink}
      exact
      to={ROUTES.ISSUE_TICKET}
    >
      {I18n.t('pages.main.buttons.issueTicket')}
    </Button>
    <Button
      variant="contained"
      style={{
        width: '200px',
        marginTop: '15px',
      }}
      component={NavLink}
      exact
      to={ROUTES.ISSUED_TICKETS}
    >
      {I18n.t('pages.main.buttons.issuedTickets')}
    </Button>
    <Button
      variant="contained"
      style={{
        width: '200px',
        marginTop: '15px',
      }}
      onClick={() => app.auth().signOut()}
    >
      {I18n.t('pages.main.buttons.signOut')}
    </Button>
  </>
);

export default Main;
