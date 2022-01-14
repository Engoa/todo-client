import React, { FC } from "react";
import { Button, TextField, Tooltip, IconButton } from "@mui/material";
import isEqual from "lodash/isEqual";
import { IUser } from "../../types/User";
import LogoutIcon from "@mui/icons-material/Logout";

interface IProfileDataBottom {
  user: IUser;
  userForm: IUser;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUser: () => void;
  logout: () => void;
}

const ProfileDataBottom: FC<IProfileDataBottom> = ({ user, handleChange, userForm, updateUser, logout }): JSX.Element => {
  return (
    <>
      <div className="profile__bottom">
        <Button variant="contained" disabled={isEqual(user, userForm)} onClick={updateUser}>
          Edit
        </Button>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div className="input--wrapper">
              <TextField
                label="First Name"
                className="profile__bottom__value"
                defaultValue={user.firstName}
                name="firstName"
                onChange={handleChange("firstName")}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div className="input--wrapper">
              <TextField
                label="Last Name"
                className="profile__bottom__value"
                defaultValue={user.lastName}
                name="lastName"
                onChange={handleChange("lastName")}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div className="input--wrapper">
              <TextField
                label="Email"
                className="profile__bottom__value"
                defaultValue={user.email}
                name="email"
                onChange={handleChange("email")}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="profile__bottom__logout">
        <Tooltip title="Logout" arrow>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default ProfileDataBottom;
