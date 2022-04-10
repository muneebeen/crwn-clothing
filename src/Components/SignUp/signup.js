import { async } from "@firebase/util";
import { useState, useContext } from "react";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentfromAuth,
} from "../../utils/firebase/firebase";
import FormInput from "../FormInput/FormInput";
import "./signup.scss";
import Button from "../Button/button";
//import { UserContext } from "../../Context/UserContext";

const SignUp = () => {
  //const { setCurrentUser } = useContext(UserContext);

  const formInputs = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(formInputs);
  const { displayName, email, password, confirmPassword } = formData;

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
    if (password === confirmPassword) {
      const response = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      if (response) {
        const user = createUserDocumentfromAuth(response.user, {
          displayName,
        });

        //setCurrentUser(response.user);
      }
    }
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData(formInputs);
  };

  return (
    <div className="signup-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up </span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={changeHandler}
          required
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={changeHandler}
          required
        />
        <Button buttonType="google" type="Submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default SignUp;
