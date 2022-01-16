import { Button, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import AuthPage from "../components/AuthPage/AuthPage";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { loginScheme } from "../schemes/authSchemes";
import { IUser } from "../types/User";
import { useLoaderContext } from "../store/loader";
import { useSnackBarContext } from "../store/snackbar";
import { capitilizeFirstLetter } from "../helpers/utils";
import useErrors from "../hooks/useErrors";
import UserErrors from "../components/UserErrors/UserErrors";

const Login = (): JSX.Element => {
  const { user, setToLS } = useUserContext();
  const [userForm, setUserForm] = React.useState<IUser>({
    email: "",
    password: "",
  });
  const { validateSchemes, setUserErrors, userErrors } = useErrors();
  const { loading, setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [key]: event.target.value });
  };

  const signIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (await validateSchemes(loginScheme, userForm)) return;
    try {
      setLoading(true);
      const res = await UserService.login(userForm);
      setToLS(res);
      toggleSnackBar(`Hi ${capitilizeFirstLetter(res.firstName)}, It's good to have you back!`);
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
      setUserForm({ ...userForm, password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthPage title={"Sign In"} new={"Sign Up"}>
        <form className="auth__form">
          <div className="auth__input">
            <TextField label="Email Address" onChange={handleChange("email")} type="email" autoComplete="email" />
          </div>
          <div className="auth__input">
            <TextField
              label="Password"
              onChange={handleChange("password")}
              type="password"
              autoComplete="current-password"
              value={userForm.password}
            />
          </div>
          <div className="auth__submit">
            <Button type="submit" variant="contained" onClick={signIn} disabled={loading}>
              Sign In
            </Button>
          </div>
        </form>
        <UserErrors userErrors={userErrors} />
      </AuthPage>
    </>
  );
};

export default Login;
