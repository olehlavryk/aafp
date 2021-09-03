import React from "react";
import { Redirect } from "react-router";
import { FormNavigator } from "src/components/Form/FormNavigator/FormNavigator";
import { LoginForm } from "./components/LoginForm/LoginForm";
import "./Login.css";

export const Login = () => {
  const isLoggedIn = !!localStorage.getItem("__token");

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page">
      <LoginForm />
      <FormNavigator
        title="I have no account, "
        textLink="Register now"
        linkTo="/register"
      />
    </div>
  );
};
