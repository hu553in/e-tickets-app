import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/index';
import { ROUTES } from '../../constants';
import './style.scss';

const UnauthorizedLayout = (props) => {
  const { children } = props;
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = () => !!currentUser;
  return (
    isLoggedIn()
      ? <Redirect to={ROUTES.DEFAULT} />
      : <div className="unauthorizedLayout">{children}</div>
  );
};

UnauthorizedLayout.propTypes = {
  children: PropTypes.node,
};

UnauthorizedLayout.defaultProps = {
  children: '',
};

export default UnauthorizedLayout;
