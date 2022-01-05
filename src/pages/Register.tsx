import React, { FC } from "react";
import arrayOfCountries from "../helpers/countries";
import AuthPage from "../components/AuthPage/AuthPage";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useUserContext } from "../store/user";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";

interface Props {
  children?: React.ReactNode;
}

const Register: FC<Props> = ({}): JSX.Element => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [userForm, setUserForm] = React.useState(user);

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [prop]: event.target.value });
  };

  const register = async (e: any) => {
    e.preventDefault();

    try {
      const res = await UserService.signup(userForm);
      setUser(res);
      navigate("/");
    } catch (err: any) {
      console.log({ err: err.response.data.message });
    }
  };

  return (
    <AuthPage title={"Sign Up"} new={"Sign In"}>
      <form className="login__form">
        <div className="login__input">
          <TextField label="Email Address" onChange={handleChange("email")} type="email" />
        </div>
        <div className="login__input">
          <TextField label="Password" onChange={handleChange("password")} type="password" />
        </div>
        <div className="login__input">
          <TextField label="Phone Number" onChange={handleChange("phone")} type="number" />
        </div>
        <div className="login__input">
          <TextField label="First Name" onChange={handleChange("firstName")} type="text" />
        </div>
        <div className="login__input">
          <TextField label="Last Name" onChange={handleChange("lastName")} type="text" />
        </div>
        <div className="login__input">
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
        <div className="login__submit">
          <Button type="submit" variant="contained" onClick={register}>
            Sign Up
          </Button>
        </div>
      </form>
    </AuthPage>
  );
};

export default Register;
