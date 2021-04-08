import { combine, createDomain } from 'effector';
import authApi from '../../api/auth/auth';
import showNotificationAndRethrow from '../../utils/showNotificationAndRethrow';

const authDomain = createDomain();

export const signInFx = authDomain.createEffect(
  ({ email, password }: { email: string; password: string }) =>
    authApi.signIn(email, password)
);

export const signOutFx = authDomain.createEffect(() => authApi.signOut());

export const $authFxPending = combine(
  signInFx.pending,
  signOutFx.pending,
  (...$authFxPending: boolean[]) =>
    $authFxPending.reduce((carry, current) => carry || current, false)
);

signInFx.fail.watch(showNotificationAndRethrow);
signOutFx.fail.watch(showNotificationAndRethrow);
