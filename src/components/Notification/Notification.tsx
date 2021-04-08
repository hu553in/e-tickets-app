import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useStore } from 'effector-react';
import React, { useCallback } from 'react';
import {
  $active,
  $message,
  $severity,
  hideNotification,
} from '../../effector/notification/index';

const Notification: React.FC = () => {
  const severity = useStore($severity);
  const active = useStore($active);
  const message = useStore($message);

  const hideNotificationModified = useCallback(() => hideNotification(), []);

  if (!message || !severity) {
    return null;
  }

  return (
    <Snackbar
      open={active}
      autoHideDuration={6000}
      onClose={hideNotificationModified}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={hideNotificationModified}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
