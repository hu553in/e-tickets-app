import { ISSUE_METHODS } from '../../constants';
import { firebase, firestore } from '../../services/firebase';

export const types = { ADD_EXISTING_TICKET: 'ADD_EXISTING_TICKET' };

export const addExistingTicket = (number, issuedAt, updatedAt) => {
  const issuedAtTimestamp = firebase.firestore.Timestamp.fromDate(issuedAt);
  const updatedAtTimestamp = firebase.firestore.Timestamp.fromDate(updatedAt);
  return () => {
    firestore.collection('tickets').doc(number).set({
      issuedAt: issuedAtTimestamp,
      updatedAt: updatedAtTimestamp,
      issueMethod: ISSUE_METHODS.MANUAL,
      isAlreadyUsed: false,
    })
      // eslint-disable-next-line no-alert
      .catch((e) => alert(e));
  };
};
