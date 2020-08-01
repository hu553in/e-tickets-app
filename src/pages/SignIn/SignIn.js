import { Button, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { I18n } from 'react-redux-i18n';
import { app } from '../../services/firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSignInButtonClick = useCallback(() => {
    app.auth().signInWithEmailAndPassword(email, password)
      // eslint-disable-next-line no-alert
      .catch((e) => alert(e));
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

export default SignIn;
