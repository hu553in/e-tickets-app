import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext, Loading } from '../../components/index';
import { ROUTES } from '../../constants';
import './style.scss';

const UnauthorizedLayout = (props) => {
  const { children } = props;
  const { currentUser } = useContext(AuthContext);
  const isLoggedIn = () => !!currentUser;
  return (
    isLoggedIn()
      ? <Redirect to={ROUTES.DEFAULT} />
      : (
        <div className="unauthorizedLayout">
          {children}
          <Loading />
        </div>
      )
  );
};

UnauthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnauthorizedLayout;
