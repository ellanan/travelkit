import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';

import MainHeader from '../MainHeader';
import { useSessionContext } from '../useSessionContext';
import { Redirect } from 'react-router-dom';

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
    <div>
      <MainHeader />
      <StyledFirebaseAuth
        uiConfig={firebaseLoginUIConfig}
        uiCallback={(...args) => {
          console.log({ args });
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default Login;
