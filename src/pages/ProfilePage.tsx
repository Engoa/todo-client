import React, { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ProfileData from "../components/ProfilePage/ProfileData";
import { UserContext } from "../store/user";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfilePage: FC = (): JSX.Element => {
  const { logout } = React.useContext(UserContext);

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
