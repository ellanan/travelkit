import React, { useMemo, useCallback, useState, useEffect } from 'react';
import firebase from 'firebase/app';

type SessionState = (
  | {
      uid: string;
      isLoggedIn: true;
    }
  | {
      uid: null | undefined;
      isLoggedIn: false;
    }
) & {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

const SessionContext = React.createContext<ReturnType<
  typeof useSession
> | null>(null);

export const SessionContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const session = useSession();
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const [sessionState, setSessionState] = useState<SessionState>({
    isLoggedIn: false,
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
  });

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setSessionState({
            isLoggedIn: true,
            ...user,
          });
        } else {
          setSessionState({
            isLoggedIn: false,
            uid: null,
            displayName: null,
            email: null,
            photoURL: null,
          });
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const logout = useCallback(() => {
    return firebase.auth().signOut();
  }, []);

  return useMemo(
    () => ({
      ...sessionState,
      logout,
    }),
    [logout, sessionState]
  );
};

export const useSessionContext = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error(`useSessionContext must be used within a SessionContext`);
  }
  return context;
};
