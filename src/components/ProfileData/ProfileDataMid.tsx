import React, { FC } from "react";
import { IconButton, Avatar, Zoom, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IUser } from "../../types/User";
import { useUserContext } from "../../store/user";

interface IProfileDataMid {
  profilePageRef: React.RefObject<HTMLDivElement>;
  toggleModalHandler: () => void;
}
const ProfileDataMid: FC<IProfileDataMid> = ({ profilePageRef, toggleModalHandler }): JSX.Element => {
  const { user } = useUserContext();
  const fullName = user.firstName + user.lastName;

  return (
    <>
      <div className="profile__mid" ref={profilePageRef}>
        <div className="profile__mid--img" onClick={toggleModalHandler}>
          <Tooltip title="Change Avatar" TransitionComponent={Zoom}>
            <IconButton>
              <Avatar src={user.avatar} sx={{ width: 200, height: 200 }} />
            </IconButton>
          </Tooltip>
          <div className="profile__mid--img--icon">
            <EditIcon fontSize="small" />
          </div>
        </div>

        <div className="profile__mid__user">
          <div className="profile__mid__user--name">
            <span>{fullName.toString().toLowerCase()}</span>
          </div>
          <div className="profile__mid__user--country">
            <LocationOnIcon fontSize="inherit" />
            <span>{user.country}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDataMid;
