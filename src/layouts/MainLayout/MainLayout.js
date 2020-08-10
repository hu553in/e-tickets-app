import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext, Loading, Notification } from '../../components/index';
import { ROUTES } from '../../constants';
import './style.scss';

const MainLayout = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = () => !!currentUser;
  return (
    isLoggedIn()
      ? (
        <div className="mainLayout">
          {children}
          <Loading />
          <Notification />
        </div>
      )
      : <Redirect to={ROUTES.SIGN_IN} />
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
