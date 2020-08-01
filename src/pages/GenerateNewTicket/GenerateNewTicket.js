import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ROUTES } from '../../constants';
import { getTickets } from '../IssuedTickets/action';
import { generateNewTicket } from './action';

const GenerateNewTicket = (props) => {
  const {
    number,
    tickets,
    generateNewTicket: generateNewTicketAlias,
    getTickets: getTicketsAlias,
  } = props;
  const inputRef = useRef(null);
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
  };
  const numbers = useMemo(() => tickets.map((ticket) => ticket.number), [tickets]);
  const onGenerateButtonClick = () => {
    getTicketsAlias()
      .then(() => generateNewTicketAlias(numbers));
  };
  return (
    <>
      <TextField
        label={I18n.t('common.labels.number')}
        variant="outlined"
        style={{ width: '200px' }}
        inputProps={{
          ref: inputRef,
          readOnly: true,
          disabled: number.length === 0,
        }}
        value={number}
      />
      <Button
        variant="contained"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        onClick={() => onGenerateButtonClick()}
      >
        {I18n.t(`pages.generateNewTicket.buttons.generate${number.length > 0 ? 'More' : ''}`)}
      </Button>
      <Button
        variant="contained"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        disabled={number.length === 0}
        onClick={copyToClipboard}
      >
        {I18n.t('pages.generateNewTicket.buttons.copyToClipboard')}
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
};

const mapStateToProps = (state) => ({
  number: state.generateNewTicketReducer.number,
  tickets: state.issuedTicketsReducer.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  generateNewTicket: bindActionCreators(generateNewTicket, dispatch),
  getTickets: bindActionCreators(getTickets, dispatch),
});

GenerateNewTicket.propTypes = {
  number: PropTypes.string.isRequired,
  generateNewTicket: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string.isRequired,
    issuedAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    issueMethod: PropTypes.string.isRequired,
    isAlreadyUsed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateNewTicket);
