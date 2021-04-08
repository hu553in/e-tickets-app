import { combine, createDomain } from 'effector';
import ticketsApi from '../../api/tickets/tickets';
import { Ticket } from '../../api/tickets/tickets.schema';
import { NotificationSeverity } from '../../constants';
import { showNotification } from '../notification';

const ticketsDomain = createDomain();

export const $tickets = ticketsDomain.createStore<Ticket[]>([]);
export const $generatedTicketNumber = ticketsDomain.createStore<string | null>(
  null
);
export const $chosenTicketNumber = ticketsDomain.createStore<string | null>(
  null
);

const showNotificationAndRethrow = (payload: { error: Error }) => {
  showNotification({
    severity: NotificationSeverity.ERROR,
    message: payload.error.message,
  });
  throw payload.error;
};

export const getTicketsFx = ticketsDomain.createEffect(() =>
  ticketsApi.getTickets()
);

export const generateNewTicketFx = ticketsDomain.createEffect(
  ({ numbers }: { numbers: string[] }) =>
    ticketsApi
      .generateNewTicket(numbers)
      .then(number => setGeneratedTicketNumber(number))
);

export const addExistingTicketFx = ticketsDomain.createEffect(
  ({
    number,
    issuedAt,
    updatedAt,
  }: {
    number: string;
    issuedAt: Date;
    updatedAt: Date;
  }) => ticketsApi.addExistingTicket(number, issuedAt, updatedAt)
);

export const setIsAlreadyUsedFx = ticketsDomain.createEffect(
  ({ number, isAlreadyUsed }: { number: string; isAlreadyUsed: boolean }) =>
    ticketsApi.setIsAlreadyUsed(number, isAlreadyUsed)
);

export const deleteTicketFx = ticketsDomain.createEffect(
  ({ number }: { number: string }) => ticketsApi.deleteTicket(number)
);

export const $ticketsFxPending = combine(
  getTicketsFx.pending,
  generateNewTicketFx.pending,
  addExistingTicketFx.pending,
  setIsAlreadyUsedFx.pending,
  deleteTicketFx.pending,
  (...$ticketsFxPending: boolean[]) =>
    $ticketsFxPending.reduce((carry, current) => carry || current, false)
);

export const setGeneratedTicketNumber = ticketsDomain.createEvent<string>();
export const resetGeneratedTicketNumber = ticketsDomain.createEvent();
export const setChosenTicketNumber = ticketsDomain.createEvent<string>();
export const resetChosenTicketNumber = ticketsDomain.createEvent();

$generatedTicketNumber.on(setGeneratedTicketNumber, (_, payload) => payload);
$generatedTicketNumber.on(resetGeneratedTicketNumber, () => null);
$chosenTicketNumber.on(setChosenTicketNumber, (_, payload) => payload);
$chosenTicketNumber.on(resetChosenTicketNumber, () => null);
$tickets.on(getTicketsFx.doneData, (_, payload) => payload);

getTicketsFx.fail.watch(showNotificationAndRethrow);
generateNewTicketFx.fail.watch(showNotificationAndRethrow);
addExistingTicketFx.fail.watch(showNotificationAndRethrow);
setIsAlreadyUsedFx.fail.watch(showNotificationAndRethrow);
deleteTicketFx.fail.watch(showNotificationAndRethrow);
