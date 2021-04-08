import { combine } from 'effector';
import { $ticketsFxPending } from '../tickets';
import { $authFxPending } from '../auth';

export const $loading = combine(
  $ticketsFxPending,
  $authFxPending,
  (...$fxPending: boolean[]) =>
    $fxPending.reduce((carry, current) => carry || current, false)
);
