import { setLoadingInternal } from '../../components/Loading/action';
import { showNotificationInternal } from '../../components/Notification/action';
import { NOTIFICATION_SEVERITIES } from '../../constants';
import { firebase, firestore } from '../../services/firebase';

export const types = { GET_TICKETS: 'GET_TICKETS' };

export const getTickets = () => async (dispatch) => {
  setLoadingInternal(dispatch, true);
  try {
    const querySnapshot = await firestore.collection('tickets').get();
    const { docs } = querySnapshot;
    dispatch({
      type: types.GET_TICKETS,
      tickets: docs.map((doc) => {
        const data = doc.data();
        return {
          number: doc.id,
          issuedAt: new Date(data.issuedAt.seconds * 1000),
          updatedAt: new Date(data.updatedAt.seconds * 1000),
          issueMethod: data.issueMethod,
          isAlreadyUsed: data.isAlreadyUsed,
        };
      }),
    });
    return setLoadingInternal(dispatch, false);
  } catch (e) {
    return showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message);
  }
};

export const setIsAlreadyUsed = (number, isAlreadyUsed) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  return async (dispatch) => {
    setLoadingInternal(dispatch, true);
    try {
      await firestore.collection('tickets').doc(number).update({
        updatedAt: timestamp,
        isAlreadyUsed,
      });
      return setLoadingInternal(dispatch, false);
    } catch (e) {
      return showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message);
    }
  };
};

export const deleteTicket = (number) => async (dispatch) => {
  setLoadingInternal(dispatch, true);
  try {
    await firestore.collection('tickets').doc(number).delete();
    return setLoadingInternal(dispatch, false);
  } catch (e) {
    return showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message);
  }
};
