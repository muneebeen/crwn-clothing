import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  auth,
  createUserDocumentfromAuth,
} from "../../utils/firebase/firebase";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { async } from "@firebase/util";
import SignUp from "../../Components/SignUp/signup";
import SignIn from "../../Components/SignIn/signin";
import "./Authentication.scss";

const Authentication = () => {
  const loginGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentfromAuth(user);
  };

  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if (response) {
      createUserDocumentfromAuth(response.user);
    }
  }, []);

  return (
    <div className="auth">
      <div className="auth-container">
        <SignIn></SignIn>
        <SignUp></SignUp>
      </div>

      <button onClick={loginGooglePopup}>Sign In With Google - Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google - Redirect
      </button>
    </div>
  );
};
export default Authentication;
