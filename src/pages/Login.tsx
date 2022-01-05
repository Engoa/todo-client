import { Button, TextField } from "@mui/material";
import React from "react";
import AuthPage from "../components/AuthPage/AuthPage";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);

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
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <AuthPage title={"Sign In"} new={"Sign Up"}>
      <form className="login__form">
        <div className="login__input">
          <TextField label="Email Address" onChange={handleChange("email")} type="email" />
        </div>
        <div className="login__input">
          <TextField label="Password" onChange={handleChange("password")} type="password" />
        </div>
        <div className="login__submit">
          <Button type="submit" variant="contained" onClick={signIn}>
            Sign In
          </Button>
        </div>
      </form>
    </AuthPage>
  );
};

export default Login;
