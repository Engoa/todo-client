import { Button, TextField } from "@mui/material";
import React from "react";
import AuthPage from "../components/AuthPage/AuthPage";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);
  const [userLoginErrors, setUserLoginErrors] = React.useState([]);

  const navigate = useNavigate();

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    try {
      const res = await UserService.login(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      setUserLoginErrors(err.response.data.message);
    }
  };

  return (
    <AuthPage title={"Sign In"} new={"Sign Up"} userLoginErrors={userLoginErrors}>
      <form className="auth__form">
        <div className="auth__input">
          <TextField label="Email Address" onChange={handleChange("email")} type="email" />
        </div>
        <div className="auth__input">
          <TextField label="Password" onChange={handleChange("password")} type="password" />
        </div>
        <div className="auth__submit">
          <Button type="submit" variant="contained" onClick={signIn}>
            Sign In
          </Button>
        </div>
      </form>
    </AuthPage>
  );
};

export default Login;
