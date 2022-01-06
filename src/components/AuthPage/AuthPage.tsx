import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AuthPage.scss";

interface Props {
  title: string;
  new: string;
  userErrors?: any;
  userLoginErrors?: any;
}

const AuthPage: FC<Props> = ({ children, ...props }): JSX.Element => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isAuthPages = location.pathname === "/login" || location.pathname === "/register";

  const genRandomString = (): string => {
    return (Math.random() + 1).toString(36).substring(7);
  };
  return (
    <div className="auth">
      <div className="auth__content">
        <div className="auth__title">
          <h3>{props.title}</h3>
        </div>
        {children}

        <div className="auth__errors">
          {props?.userErrors?.map((error: any, index: number) => (
            <div className="auth__error">
              <span>*</span>
              <p key={genRandomString + error + index}>{error}</p>
            </div>
          ))}
          {props.userLoginErrors && <div className="auth__error">{<span>{props?.userLoginErrors}</span>}</div>}
        </div>

        <div className="auth__new">
          <span>{isLogin ? "New to site?" : "Already have an account?"}</span>
          <Link to={isLogin ? "/register" : "/login"}>{props.new} now</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
