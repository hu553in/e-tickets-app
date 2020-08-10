export const types = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

export const showNotificationInternal = (dispatch, severity, message) => dispatch({
  type: types.SHOW_NOTIFICATION,
  severity,
  message,
});

export const showNotification = (severity, message) => (dispatch) => dispatch({
  type: types.SHOW_NOTIFICATION,
  severity,
  message,
});

export const hideNotification = () => (dispatch) => dispatch({
  type: types.HIDE_NOTIFICATION,
});
