import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from './action';

const Alert = ({ onClose, severity, children }) => (
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={onClose}
    severity={severity}
  >
    {children}
  </MuiAlert>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
};

const Notification = ({
  isActive,
  severity,
  message,
  hideNotification: hideNotificationAlias,
}) => (
  <Snackbar open={isActive} autoHideDuration={6000} onClose={hideNotificationAlias}>
    <Alert onClose={hideNotificationAlias} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

Notification.propTypes = {
  hideNotification: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf([
    'error',
    'info',
    'warning',
    'success',
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  isActive: state.notificationReducer.isActive,
  message: state.notificationReducer.message,
  severity: state.notificationReducer.severity,
});

const mapDispatchToProps = (dispatch) => ({
  hideNotification: bindActionCreators(hideNotification, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
