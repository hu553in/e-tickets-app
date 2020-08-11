import { setLoadingInternal } from '../../components/Loading/action';
import { showNotificationInternal } from '../../components/Notification/action';
import { ISSUE_METHODS, NOTIFICATION_SEVERITIES } from '../../constants';
import { firebase, firestore } from '../../services/firebase';

export const types = { ADD_EXISTING_TICKET: 'ADD_EXISTING_TICKET' };

export const addExistingTicket = (number, issuedAt, updatedAt) => (
  (dispatch) => setLoadingInternal(dispatch, true)
    .then(() => firestore.collection('tickets').doc(number).set({
      issuedAt: firebase.firestore.Timestamp.fromDate(issuedAt),
      updatedAt: firebase.firestore.Timestamp.fromDate(updatedAt),
      issueMethod: ISSUE_METHODS.MANUAL,
      isAlreadyUsed: false,
    }))
    .then(() => setLoadingInternal(dispatch, false))
    .catch((e) => showNotificationInternal(dispatch, NOTIFICATION_SEVERITIES.ERROR, e.message))
);
