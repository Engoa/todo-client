import React, { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./ProfilePage.scss";
import { logout } from "../../helpers/utils";
import ProfileData from "./ProfileData";

const ProfilePage: FC = (): JSX.Element => {
  return (
    <div className="profile">
      <ProfileData />
      <div className="profile__bottom__logout">
        <Tooltip title="Logout" arrow>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProfilePage;
