import { setLoadingInternal } from '../../components/Loading/action';
import { showNotificationInternal } from '../../components/Notification/action';
import { NOTIFICATION_SEVERITIES } from '../../constants';
import { firebase, firestore } from '../../services/firebase';

export const types = { GET_TICKETS: 'GET_TICKETS' };

export const getTickets = () => (
  (dispatch) => setLoadingInternal(dispatch, true)
    .then(() => firestore.collection('tickets').get())
    .then((querySnapshot) => querySnapshot.docs)
    .then((docs) => dispatch({
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
    }))
    .then(() => setLoadingInternal(dispatch, false))
    .catch((e) => showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message))
);

export const setIsAlreadyUsed = (number, isAlreadyUsed) => (
  (dispatch) => setLoadingInternal(dispatch, true)
    .then(() => firestore.collection('tickets').doc(number).update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      isAlreadyUsed,
    }))
    .then(() => setLoadingInternal(dispatch, false))
    .catch((e) => showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message))
);

export const deleteTicket = (number) => (
  (dispatch) => setLoadingInternal(dispatch, true)
    .then(() => firestore.collection('tickets').doc(number).delete())
    .then(() => setLoadingInternal(dispatch, false))
    .catch((e) => showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message))
);
