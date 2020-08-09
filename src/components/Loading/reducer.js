import initialState from '../../redux/initialState';
import { types } from './action';

export default (state = initialState.loadingReducer, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default: {
      return state;
    }
  }
};
