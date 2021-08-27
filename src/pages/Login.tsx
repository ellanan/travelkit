import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';

import MainHeader from '../MainHeader';
import { useSessionContext } from '../useSessionContext';
import { Redirect } from 'react-router-dom';
import { LoginPageLinks } from '../Links';

const firebaseLoginUIConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    },
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => {
  const { uid } = useSessionContext();

  if (uid) {
    return <Redirect to={`/lists/${uid}`} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <MainHeader />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em' }}>
        TravelKit
      </p>
      <StyledFirebaseAuth
        uiConfig={firebaseLoginUIConfig}
        firebaseAuth={firebase.auth()}
      />
      <LoginPageLinks />
    </div>
  );
};

export default Login;
