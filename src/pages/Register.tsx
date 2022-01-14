import React, { FC, SyntheticEvent } from "react";
import arrayOfCountries from "../helpers/countries";
import AuthPage from "../components/AuthPage/AuthPage";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useUserContext } from "../store/user";
import { UserService } from "../services/user.service";
import { registerScheme } from "../schemes/authSchemes";
import { useLoaderContext } from "../store/loader";
import { useSnackBarContext } from "../store/snackbar";
import { capitilizeFirstLetter } from "../helpers/utils";
import useErrors from "../hooks/useErrors";
import UserErrors from "../components/UserErrors/UserErrors";

interface Props {
  children?: React.ReactNode;
}

const Register: FC<Props> = (): JSX.Element => {
  const { user, setUser } = useUserContext();
  const { loading, setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();
  const { validateSchemes, setUserErrors, userErrors } = useErrors();
  const [userForm, setUserForm] = React.useState(user);

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (await validateSchemes(registerScheme, userForm)) return;
    try {
      setLoading(true);
      const res = await UserService.signup(userForm);
      setUser(res);
      toggleSnackBar(`Hi ${capitilizeFirstLetter(res.firstName)}, you've successfully registered!`);
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthPage title={"Sign Up"} new={"Sign In"}>
        <form className="auth__form">
          <div className="auth__input">
            <TextField label="Email Address" onChange={handleChange("email")} type="email" autoComplete="email" />
          </div>
          <div className="auth__input">
            <TextField label="Password" onChange={handleChange("password")} type="password" autoComplete="new-password" />
          </div>
          <div className="auth__input">
            <TextField label="Phone Number" onChange={handleChange("phone")} type="number" autoComplete="tel" />
          </div>
          <div className="auth__input">
            <TextField label="First Name" onChange={handleChange("firstName")} type="text" autoComplete="given-name" />
          </div>
          <div className="auth__input">
            <TextField label="Last Name" onChange={handleChange("lastName")} type="text" autoComplete="family-name" />
          </div>
          <div className="auth__input">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select value={userForm.country ?? ""} onChange={handleChange("country")} label="Country">
                {arrayOfCountries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="auth__submit">
            <Button type="submit" variant="contained" onClick={register} disabled={loading}>
              Sign Up
            </Button>
          </div>
        </form>
        <UserErrors userErrors={userErrors} />
      </AuthPage>
    </>
  );
};

export default Register;
