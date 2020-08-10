import initialState from '../../redux/initialState';
import { types } from './action';

export default (state = initialState.notificationReducer, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION: {
      return {
        ...state,
        isActive: true,
        severity: action.severity,
        message: action.message,
      };
    }
    case types.HIDE_NOTIFICATION: {
      return {
        ...state,
        isActive: false,
      };
    }
    default: {
      return state;
    }
  }
};
