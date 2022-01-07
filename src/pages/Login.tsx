import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import AuthPage from "../components/AuthPage/AuthPage";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { loginScheme } from "../schemes/authSchemes";

const Login = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    const isValid = await loginScheme.validate(userForm, { abortEarly: false }).catch((err) => err.errors);
    if (Array.isArray(isValid)) return setUserErrors([isValid as any]);
    // If not valid return and show errors.
    setLoading(true);
    try {
      const res = await UserService.login(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthPage title={"Sign In"} new={"Sign Up"} userErrors={userErrors}>
        <form className="auth__form">
          <div className="auth__input">
            <TextField label="Email Address" onChange={handleChange("email")} type="email" autoComplete="email" />
          </div>
          <div className="auth__input">
            <TextField label="Password" onChange={handleChange("password")} type="password" autoComplete="current-password" />
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
