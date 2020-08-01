import { firebase, firestore } from '../../services/firebase';

export const types = { GET_TICKETS: 'GET_TICKETS' };

export const getTickets = () => (
  (dispatch) => firestore.collection('tickets').get()
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
    // eslint-disable-next-line no-alert
    .catch((e) => alert(e))
);

export const setIsAlreadyUsed = (number, isAlreadyUsed) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  return () => (
    firestore.collection('tickets').doc(number).update({
      updatedAt: timestamp,
      isAlreadyUsed,
    })
      // eslint-disable-next-line no-alert
      .catch((e) => alert(e))
  );
};

export const deleteTicket = (number) => () => (
  firestore.collection('tickets').doc(number).delete()
  // eslint-disable-next-line no-alert
    .catch((e) => alert(e))
);
