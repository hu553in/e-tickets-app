import { setLoadingInternal } from '../../components/Loading/action';
import { showNotificationInternal } from '../../components/Notification/action';
import { ISSUE_METHODS } from '../../constants';
import { firebase, firestore } from '../../services/firebase';
import { getRandomInteger } from '../../services/math';

export const types = {
  GENERATE_NEW_TICKET: 'GENERATE_NEW_TICKET',
  RESET_STATE: 'RESET_STATE',
};

const generateTicketNumber = (numbers) => {
  let number;
  do {
    number = getRandomInteger(100000, 999999).toString();
  } while (numbers.includes(number));
  return number;
};

export const generateNewTicket = (numbers) => {
  const number = generateTicketNumber(numbers);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  return async (dispatch) => {
    setLoadingInternal(dispatch, true);
    try {
      await firestore.collection('tickets').doc(number).set({
        issuedAt: timestamp,
        updatedAt: timestamp,
        issueMethod: ISSUE_METHODS.AUTOMATIC,
        isAlreadyUsed: false,
      });
      dispatch({
        type: types.GENERATE_NEW_TICKET,
        number,
      });
      return setLoadingInternal(dispatch, false);
    } catch (e) {
      return showNotificationInternal(dispatch, 'error', e.message);
    }
  };
};

export const resetState = () => (dispatch) => dispatch({
  type: types.RESET_STATE,
});
