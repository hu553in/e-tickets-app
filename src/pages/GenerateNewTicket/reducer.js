import initialState from '../../redux/initialState';
import { types } from './action';

export default (state = initialState.generateNewTicketReducer, action) => {
  switch (action.type) {
    case types.GENERATE_NEW_TICKET: {
      return {
        ...state,
        number: action.number,
      };
    }
    default: {
      return state;
    }
  }
};
