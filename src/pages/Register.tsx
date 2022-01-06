import React, { FC } from "react";
import arrayOfCountries from "../helpers/countries";
import AuthPage from "../components/AuthPage/AuthPage";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useUserContext } from "../store/user";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";

interface Props {
  children?: React.ReactNode;
}

const Register: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);
  const [userErrors, setUserErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const register = async (e: any) => {
    e.preventDefault();
    if (!userForm.email || !userForm.password || !userForm.firstName || !userForm.lastName || !userForm.country) return;
    try {
      setLoading(true);
      const res = await UserService.signup(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      setUserErrors(err.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  return (
    <>
      <AuthPage title={"Sign Up"} new={"Sign In"} userErrors={userErrors}>
        <form className="auth__form">
          <div className="auth__input">
            <TextField label="Email Address" onChange={handleChange("email")} type="email" autoComplete="true" />
          </div>
          <div className="auth__input">
            <TextField label="Password" onChange={handleChange("password")} type="password" autoComplete="true" />
          </div>
          <div className="auth__input">
            <TextField label="Phone Number" onChange={handleChange("phone")} type="number" autoComplete="true" />
          </div>
          <div className="auth__input">
            <TextField label="First Name" onChange={handleChange("firstName")} type="text" autoComplete="true" />
          </div>
          <div className="auth__input">
            <TextField label="Last Name" onChange={handleChange("lastName")} type="text" autoComplete="true" />
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
            <Button type="submit" variant="contained" onClick={register} disabled={loading ? true : false}>
              Sign Up
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

export default Register;
