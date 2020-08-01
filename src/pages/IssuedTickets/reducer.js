import initialState from '../../redux/initialState';
import { types } from './action';

export default (state = initialState.issuedTicketsReducer, action) => {
  switch (action.type) {
    case types.GET_TICKETS: {
      return {
        ...state,
        tickets: action.tickets,
      };
    }
    default: {
      return state;
    }
  }
};
