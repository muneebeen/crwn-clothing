import { async } from "@firebase/util";
import { useState, useContext } from "react";
import {
  createUserDocumentfromAuth,
  signInUser,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import FormInput from "../FormInput/FormInput";
import "./signin.scss";
import Button from "../Button/button";
import { UserContext } from "../../Context/UserContext";

const SignIn = () => {
  //const { setCurrentUser } = useContext(UserContext);

  const formInputs = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(formInputs);
  const { email, password } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { user } = await signInUser(email, password); // It returns response so we destructred user from it.
    //setCurrentUser(user);
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData(formInputs);
  };
  const loginGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentfromAuth(user);
    //setCurrentUser(response.user);
  };

  return (
    <div className="signup-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up </span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
        />

        <div className="btn-container">
          <Button type="Submit">Login</Button>
          <Button type="button" buttonType="google" onClick={loginGooglePopup}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
