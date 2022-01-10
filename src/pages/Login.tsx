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

const Login = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState<IUser>(user);
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);
  const { loading, setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const signIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUserErrors([]);
    const isValid = await loginScheme.validate(userForm, { abortEarly: false }).catch((err) => err.errors);
    if (Array.isArray(isValid)) return setUserErrors(isValid);
    // If not valid return and show errors.
    try {
      setLoading(true);
      const res = await UserService.login(userForm);
      setUser(res);
      toggleSnackBar(`Hi ${capitilizeFirstLetter(res.firstName)}, It's good to have you back!`);
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
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
            <Button type="submit" variant="contained" onClick={signIn} disabled={loading}>
              Sign In
            </Button>
          </div>
        </form>
      </AuthPage>
    </>
  );
};

export default Login;
