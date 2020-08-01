import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/index';
import { ROUTES } from '../../constants';
import './style.scss';

const MainLayout = (props) => {
  const { children } = props;
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = () => !!currentUser;
  return (
    isLoggedIn()
      ? <div className="mainLayout">{children}</div>
      : <Redirect to={ROUTES.SIGN_IN} />
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

MainLayout.defaultProps = {
  children: '',
};

export default MainLayout;
