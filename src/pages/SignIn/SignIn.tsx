import { Button, TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInFx } from '../../effector/auth';
import './style.scss';

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const onSignInButtonClick = useCallback(() => {
    signInFx({ email, password });
  }, [email, password]);

  const onEmailChange = useCallback(e => setEmail(e.target.value), []);
  const onPasswordChange = useCallback(e => setPassword(e.target.value), []);

  const inputProps = useMemo(
    () => ({
      onKeyUp: (
        e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        if (e.key === 'Enter' && email.length > 0 && password.length > 0) {
          e.preventDefault();
          onSignInButtonClick();
        }
      },
    }),
    [email.length, onSignInButtonClick, password.length]
  );

  return (
    <>
      <TextField
        label={t('pages.signIn.labels.email')}
        variant='outlined'
        className={'signIn__input'}
        value={email}
        inputProps={inputProps}
        onChange={onEmailChange}
      />
      <TextField
        label={t('pages.signIn.labels.password')}
        type='password'
        variant='outlined'
        className={'signIn__input'}
        value={password}
        inputProps={inputProps}
        onChange={onPasswordChange}
      />
      <Button
        variant='contained'
        className={'signIn__button'}
        disabled={email.length === 0 || password.length === 0}
        onClick={onSignInButtonClick}
      >
        {t('pages.signIn.buttons.signIn')}
      </Button>
    </>
  );
};

export default SignIn;
