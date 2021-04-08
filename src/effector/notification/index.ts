import { createDomain } from 'effector';
import { NotificationSeverity } from '../../constants';

interface ShowNotificationEventPayload {
  severity: NotificationSeverity;
  message: string;
}

const notificationDomain = createDomain();

export const $active = notificationDomain.createStore<boolean>(false);
export const $severity = notificationDomain.createStore<NotificationSeverity | null>(
  null
);
export const $message = notificationDomain.createStore<string | null>(null);

export const showNotification = notificationDomain.createEvent<ShowNotificationEventPayload>();
export const hideNotification = notificationDomain.createEvent();

$active.on(showNotification, () => true);
$severity.on(showNotification, (_, payload) => payload.severity);
$message.on(showNotification, (_, payload) => payload.message);
$active.on(hideNotification, () => false);
$severity.on(hideNotification, () => null);
$message.on(hideNotification, () => null);
