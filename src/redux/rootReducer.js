import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';
import loadingReducer from '../components/Loading/reducer';
import generateNewTicketReducer from '../pages/GenerateNewTicket/reducer';
import issuedTicketsReducer from '../pages/IssuedTickets/reducer';

export default (state = {}, action) => combineReducers({
  i18n: i18nReducer,
  generateNewTicketReducer,
  issuedTicketsReducer,
  loadingReducer,
})(state, action);
