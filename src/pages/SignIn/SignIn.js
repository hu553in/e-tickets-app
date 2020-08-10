import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { setLoading } from '../../components/Loading/action';
import { showNotification } from '../../components/Notification/action';
import { NOTIFICATION_SEVERITIES } from '../../constants';
import { app } from '../../services/firebase';

const SignIn = ({
  setLoading: setLoadingAlias,
  showNotification: showNotificationAlias,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);
  const onSignInButtonClick = useCallback(() => {
    setLoadingAlias(true);
    app.auth().signInWithEmailAndPassword(email, password)
      .then(() => setLoadingAlias(false))
      .catch((e) => {
        setLoadingAlias(false);
        showNotificationAlias(NOTIFICATION_SEVERITIES.ERROR, e.message);
      });
  }, [email, password]);
  return (
    <>
      <TextField
        label={I18n.t('pages.signIn.labels.email')}
        variant="outlined"
        style={{ width: '200px' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label={I18n.t('pages.signIn.labels.password')}
        type="password"
        variant="outlined"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        style={{
          width: '200px',
          marginTop: '15px',
        }}
        disabled={email.length === 0 || password.length === 0}
        onClick={onSignInButtonClick}
      >
        {I18n.t('pages.signIn.buttons.signIn')}
      </Button>
    </>
  );
};

SignIn.propTypes = {
  setLoading: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setLoading: bindActionCreators(setLoading, dispatch),
  showNotification: bindActionCreators(showNotification, dispatch),
});

export default connect(null, mapDispatchToProps)(SignIn);
