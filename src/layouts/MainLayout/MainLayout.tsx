import React, { useCallback, useContext } from 'react';
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

const MainLayout: React.FC<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContextInstance);
  const isLoggedIn = useCallback(() => !!currentUser, [currentUser]);
  const location = useLocation();

  return isLoggedIn() ? (
    <div className='mainLayout'>
      {children}
      <Loading />
      <Notification />
    </div>
  ) : (
    <Redirect to={`${ROUTES.SIGN_IN}?return_to=${location.pathname}`} />
  );
};

export default MainLayout;
