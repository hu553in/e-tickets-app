import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { app } from '../../services/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { children } = props;
  useEffect(() => app.auth().onAuthStateChanged(
    (user) => setCurrentUser(user),
  ), []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: '',
};
