import DateFnsUtils from '@date-io/date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Button, TextField } from '@material-ui/core';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ROUTES } from '../../constants';
import {
  isEmptyOrNumberString,
  isSixDigitNumberString,
} from '../../services/validators';
import { getTickets } from '../IssuedTickets/action';
import { addExistingTicket } from './action';

const AddExistingTicket = (props) => {
  const localeMap = {
    ru_RU: ru,
    en_US: enUS,
  };
  const [
    selectedIssuedAtDateTime,
    handleIssuedAtDateTimeChange,
  ] = useState(new Date());
  const [
    selectedUpdatedAtDateTime,
    handleUpdatedAtDateTimeChange,
  ] = useState(new Date());
  const [number, setNumber] = useState('');
  const {
    addExistingTicket: addExistingTicketAlias,
    getTickets: getTicketsAlias,
    tickets,
  } = props;
  const numbers = useMemo(() => tickets.map((ticket) => ticket.number), [tickets]);
  const onAddButtonClick = () => {
    getTicketsAlias()
      .then(() => {
        if (numbers.includes(number)) {
          // eslint-disable-next-line no-alert
          alert(I18n.t('pages.addExistingTicket.errors.numberAlreadyExists'));
        } else {
          addExistingTicketAlias(
            number,
            selectedIssuedAtDateTime,
            selectedUpdatedAtDateTime,
          );
        }
      });
  };
  return (
    <>
      <TextField
        label={I18n.t('common.labels.number')}
        variant="outlined"
        style={{ width: '200px' }}
        value={number}
        onChange={(e) => {
          const { value } = e.target;
          if (isEmptyOrNumberString(value)) {
            setNumber(value);
          }
        }}
      />
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={localeMap[process.env.REACT_APP_LOCALE]}
      >
        <DateTimePicker
          okLabel={I18n.t('pages.addExistingTicket.buttons.ok')}
          cancelLabel={I18n.t('pages.addExistingTicket.buttons.cancel')}
          todayLabel={I18n.t('pages.addExistingTicket.buttons.today')}
          showTodayButton
          label={I18n.t('common.labels.issuedAt')}
          ampm={false}
          disableFuture
          inputVariant="outlined"
          value={selectedIssuedAtDateTime}
          format="yyyy-MM-dd HH:mm"
          style={{
            width: '200px',
            marginTop: '15px',
          }}
          onChange={handleIssuedAtDateTimeChange}
        />
        <DateTimePicker
          showTodayButton
          label={I18n.t('common.labels.updatedAt')}
          ampm={false}
          disableFuture
          inputVariant="outlined"
          value={selectedUpdatedAtDateTime}
          format="yyyy-MM-dd HH:mm"
          style={{
            width: '200px',
            marginTop: '15px',
          }}
          onChange={handleUpdatedAtDateTimeChange}
        />
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        onClick={onAddButtonClick}
        disabled={
          number.length === 0
          || !isSixDigitNumberString(number)
          || selectedUpdatedAtDateTime < selectedIssuedAtDateTime
        }
      >
        {I18n.t('pages.addExistingTicket.buttons.add')}
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
  tickets: state.issuedTicketsReducer.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  addExistingTicket: bindActionCreators(addExistingTicket, dispatch),
  getTickets: bindActionCreators(getTickets, dispatch),
});

AddExistingTicket.propTypes = {
  addExistingTicket: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string.isRequired,
    issuedAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    issueMethod: PropTypes.string.isRequired,
    isAlreadyUsed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExistingTicket);
