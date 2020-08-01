import { Button } from '@material-ui/core';
import React from 'react';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

const IssueTicket = () => (
  <>
    <Button
      variant="contained"
      style={{ width: '200px' }}
      component={NavLink}
      exact
      to={ROUTES.GENERATE_NEW_TICKET}
    >
      {I18n.t('pages.issueTicket.buttons.newTicket')}
    </Button>
    <Button
      variant="contained"
      style={{
        width: '200px',
        marginTop: '15px',
      }}
      component={NavLink}
      exact
      to={ROUTES.ADD_EXISTING_TICKET}
    >
      {I18n.t('pages.issueTicket.buttons.existingTicket')}
    </Button>
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

export default IssueTicket;
