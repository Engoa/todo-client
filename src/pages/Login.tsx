import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import AuthPage from "../components/AuthPage/AuthPage";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);
  const [userLoginErrors, setUserLoginErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>();

  const navigate = useNavigate();
  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    if (!userForm.email || !userForm.password) return;
    try {
      setLoading(true);
      const res = await UserService.login(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      setUserLoginErrors(err.response.data.message);
      passwordRef.current!.value = "";
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  return (
    <>
      <AuthPage title={"Sign In"} new={"Sign Up"} userLoginErrors={userLoginErrors}>
        <form className="auth__form">
          <div className="auth__input">
            <TextField label="Email Address" onChange={handleChange("email")} type="email" autoComplete="true" />
          </div>
          <div className="auth__input">
            <TextField inputRef={passwordRef} label="Password" onChange={handleChange("password")} type="password" autoComplete="true" />
          </div>
          <div className="auth__submit">
            <Button type="submit" variant="contained" onClick={signIn} disabled={loading ? true : false}>
              Sign In
            </Button>
          </div>
        </form>
      </AuthPage>
      {loading && (
        <div className="spinner--wrapper">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Login;
