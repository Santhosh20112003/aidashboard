import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return signInWithPopup(auth, googleAuthProvider);
  }
  function GithubSignIn() {
    const githubAuthProvider = new GithubAuthProvider();
    githubAuthProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return signInWithPopup(auth, githubAuthProvider);
  }
  function TwitterSignIn() {
    const twitterAuthProvider = new TwitterAuthProvider();
    return signInWithPopup(auth, twitterAuthProvider);
  }
  function FacebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logOut,
        TwitterSignIn,
        googleSignIn,
        GithubSignIn,
        FacebookSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
