import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';

import MainHeader from '../MainHeader';

const firebaseLoginUIConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => {
  return (
    <div>
      <MainHeader />
      <StyledFirebaseAuth
        uiConfig={firebaseLoginUIConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default Login;
