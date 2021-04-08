import queryString from 'query-string';
import React, { useCallback, useContext, useMemo } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {
  AuthContextInstance,
  Loading,
  Notification,
} from '../../components/index';
import { ROUTES } from '../../constants';
import './style.scss';

interface Props {
  children: React.ReactNode;
}

const UnauthorizedLayout: React.FC<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContextInstance);
  const isLoggedIn = useCallback(() => !!currentUser, [currentUser]);
  const location = useLocation();

  const parsedQueryString = useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);

  return isLoggedIn() ? (
    <Redirect
      to={
        typeof parsedQueryString?.['return_to'] === 'string'
          ? parsedQueryString['return_to']
          : ROUTES.DEFAULT
      }
    />
  ) : (
    <div className='unauthorizedLayout'>
      {children}
      <Loading />
      <Notification />
    </div>
  );
};

export default UnauthorizedLayout;
