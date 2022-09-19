import React, { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInhUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import './singInForm.style.scss'

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {  email, password } = formFields;

  //saving the inputs changes that will passed after
  //reading inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    

    try {
      const response = await signInhUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an acoount?</h2>
      <span>Sign In with Your email and password</span>
      <form onSubmit={handleSubmit}>
      

        <FormInput
        label='Email'
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

<FormInput
        label='Password'
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
