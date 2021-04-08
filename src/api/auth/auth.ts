import { app } from '../../utils/firebase';

const authApi = {
  signIn: (email: string, password: string) =>
    app.auth().signInWithEmailAndPassword(email, password),

  signOut: () => app.auth().signOut(),
};

export default authApi;
