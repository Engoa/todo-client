import React, { FC, useState } from "react";
import arrayOfCountries from "../helpers/countries";
import AuthPage from "../components/AuthPage/AuthPage";
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}
const Register: FC<Props> = ({}): JSX.Element => {
  const [userCountry, setUserCountry] = React.useState("");
  const [userForm, setUserForm] = React.useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
    console.log(userForm);
  };

  const register = () => {};

  return (
    <AuthPage title={"Sign Up"} new={"Sign In"}>
      <form className="login__form">
        <div className="login__input">
          <TextField label="Email Address" variant="filled" name="email" defaultValue={userForm.email} onChange={handleChange} type="email" />
        </div>
        <div className="login__input">
          <TextField label="Password" variant="filled" name="password" onChange={handleChange} type="password" />
        </div>
        <div className="login__input">
          <TextField label="Phone Number" variant="filled" name="phone" onChange={handleChange} type="number" />
        </div>
        <div className="login__input">
          <TextField label="First Name" variant="filled" name="firstName" onChange={handleChange} type="text" />
        </div>
        <div className="login__input">
          <TextField label="Last Name" variant="filled" name="lastName" onChange={handleChange} type="text" />
        </div>
        <div className="login__input">
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userCountry}
              onChange={handleChange}
              label="Country"
              variant="filled"
              name="country"
            >
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
            Sign In
          </Button>
        </div>
      </form>
    </AuthPage>
  );
};

export default Register;
