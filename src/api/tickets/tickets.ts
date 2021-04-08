import { IssueMethod } from '../../constants';
import { firebase, firestore } from '../../utils/firebase';
import { getRandomInteger } from '../../utils/math';
import { Ticket } from './tickets.schema';

const generateTicketNumber = (numbers: string[]) => {
  let number;
  do {
    number = getRandomInteger(100000, 999999).toString();
  } while (numbers.includes(number));
  return number;
};

const ticketsApi = {
  getTickets: () =>
    firestore
      .collection('tickets')
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            number: doc.id,
            issuedAt: new Date(data['issuedAt'].seconds * 1000),
            updatedAt: new Date(data['updatedAt'].seconds * 1000),
            issueMethod: data['issueMethod'],
            isAlreadyUsed: data['isAlreadyUsed'],
          } as Ticket;
        })
      ),

  generateNewTicket: async (numbers: string[]) => {
    const number = generateTicketNumber(numbers);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await firestore.collection('tickets').doc(number).set({
      issuedAt: timestamp,
      updatedAt: timestamp,
      issueMethod: IssueMethod.AUTOMATIC,
      isAlreadyUsed: false,
    });
    return await Promise.resolve(number);
  },

  addExistingTicket: (number: string, issuedAt: Date, updatedAt: Date) =>
    firestore
      .collection('tickets')
      .doc(number)
      .set({
        issuedAt: firebase.firestore.Timestamp.fromDate(issuedAt),
        updatedAt: firebase.firestore.Timestamp.fromDate(updatedAt),
        issueMethod: IssueMethod.MANUAL,
        isAlreadyUsed: false,
      }),

  setIsAlreadyUsed: (number: string, isAlreadyUsed: boolean) =>
    firestore.collection('tickets').doc(number).update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      isAlreadyUsed,
    }),

  deleteTicket: (number: string) =>
    firestore.collection('tickets').doc(number).delete(),
};

export default ticketsApi;
