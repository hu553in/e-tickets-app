import { NotificationSeverity } from '../constants';
import { showNotification } from '../effector/notification';

const showNotificationAndRethrow = (payload: { error: Error }) => {
  showNotification({
    severity: NotificationSeverity.ERROR,
    message: payload.error.message,
  });
  throw payload.error;
};

export default showNotificationAndRethrow;
