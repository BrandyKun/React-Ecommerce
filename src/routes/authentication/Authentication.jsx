import React from "react";
import SignUpForm from "../../components/sign-up/SignUpForm";
import SignInForm from "../../components/sign-in/SignInForm";
import "./authentication.styles.scss";


const Authentication = () => {

  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
