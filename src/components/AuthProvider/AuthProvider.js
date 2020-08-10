import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app } from '../../services/firebase';
import { setLoading } from '../Loading/action';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { children, setLoading: setLoadingAlias } = props;
  useEffect(() => {
    setLoadingAlias(true);
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingAlias(false);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setLoading: bindActionCreators(setLoading, dispatch),
});

export default connect(null, mapDispatchToProps)(AuthProvider);
