import { setLoading } from '../../components/Loading/action';
import { firebase, firestore } from '../../services/firebase';

export const types = { GET_TICKETS: 'GET_TICKETS' };

export const getTickets = () => async (dispatch) => {
  setLoading(dispatch, true);
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
    return setLoading(dispatch, false);
  } catch (e) {
    // eslint-disable-next-line no-alert
    return alert(e);
  }
};

export const setIsAlreadyUsed = (number, isAlreadyUsed) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  return async (dispatch) => {
    setLoading(dispatch, true);
    try {
      await firestore.collection('tickets').doc(number).update({
        updatedAt: timestamp,
        isAlreadyUsed,
      });
      return setLoading(dispatch, false);
    } catch (e) {
      // eslint-disable-next-line no-alert
      return alert(e);
    }
  };
};

export const deleteTicket = (number) => async (dispatch) => {
  setLoading(dispatch, true);
  try {
    await firestore.collection('tickets').doc(number).delete();
    return setLoading(dispatch, false);
  } catch (e) {
    // eslint-disable-next-line no-alert
    return alert(e);
  }
};
