import React, { FC } from "react";
import arrayOfCountries from "../helpers/countries";
import AuthPage from "../components/AuthPage/AuthPage";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useUserContext } from "../store/user";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";
import { registerScheme } from "../schemes/authSchemes";
import { useLoaderContext } from "../store/loader";

interface Props {
  children?: React.ReactNode;
}

const Register: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);
  const { loading, setLoading } = useLoaderContext();

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const register = async (e: any) => {
    e.preventDefault();
    const isValid = await registerScheme.validate(userForm, { abortEarly: false }).catch((err) => err.errors);
    if (Array.isArray(isValid)) return setUserErrors(isValid);
    // If not valid return and show errors.
    try {
      setLoading(true);
      const res = await UserService.signup(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data.message);
      setUserErrors([...userErrors, err.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthPage title={"Sign Up"} new={"Sign In"} userErrors={userErrors}>
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
      </AuthPage>
    </>
  );
};

export default Register;
