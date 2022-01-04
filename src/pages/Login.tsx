import React from "react";
import AuthPage from "../components/AuthPage/AuthPage";

const Login = (): JSX.Element => {
  return (
    <AuthPage title={"Sign In"} new={"Sign Up"}>
      <form className="login__form">
        <div className="login__input">
          <input type="email" spellCheck="false" placeholder="Email Address" />
        </div>
        <div className="login__input">
          <input type="password" spellCheck="false" placeholder="Password" />
        </div>
        <div className="login__submit">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </AuthPage>
  );
};

export default Login;
