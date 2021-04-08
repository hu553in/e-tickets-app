import React, { useEffect, useState } from 'react';
import { app, firebase } from '../../utils/firebase';

interface Props {
  children: React.ReactNode;
}

interface AuthContext {
  currentUser: firebase.User | null;
}

export const AuthContextInstance = React.createContext<AuthContext>({
  currentUser: null,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContextInstance.Provider value={{ currentUser }}>
      {children}
    </AuthContextInstance.Provider>
  );
};

export default AuthProvider;
