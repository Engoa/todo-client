import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./AuthPage.scss";

interface Props {
  title: string;
  new: string;
  userErrors: Array<string>;
}

const AuthPage: FC<Props> = ({ children, ...props }): JSX.Element => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="auth">
      <div className="auth__content" style={{ justifyContent: `${isLogin ? "center" : "flex-start"}` }}>
        <div className="auth__title">
          <h3>{props.title}</h3>
        </div>
        {children}

        {props.userErrors.length ? (
          <ul className="auth__errors">
            {props.userErrors.map((err: string, index: number) => (
              <li key={index} className="auth__error">
                * {err}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="auth__new">
          <span>{isLogin ? "New to site?" : "Already have an account?"}</span>
          <Link to={isLogin ? "/register" : "/login"}>{props.new} now</Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthPage;
