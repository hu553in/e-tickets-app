import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { app } from '../../services/firebase';
import { setLoadingActionCreator } from '../Loading/action';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { children, setLoadingActionCreator: setLoadingActionCreatorAlias } = props;
  useEffect(() => {
    setLoadingActionCreatorAlias(true);
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoadingActionCreatorAlias(false);
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
  setLoadingActionCreator: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setLoadingActionCreator: bindActionCreators(setLoadingActionCreator, dispatch),
});

export default connect(null, mapDispatchToProps)(AuthProvider);
