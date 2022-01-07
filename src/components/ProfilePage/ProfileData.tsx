import { Button, IconButton, Tooltip } from "@mui/material";
import { useUserContext } from "../../store/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import React, { FC } from "react";

const ProfileData: FC = (): JSX.Element => {
  const { user } = useUserContext();
  const { firstName, lastName, email, phone } = user;
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="profile__top">
        <Tooltip title="Go Back" arrow>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
        </Tooltip>
        <h1>My Account</h1>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="profile__mid">
        <div className="profile__mid--img">
          <img src="https://picsum.photos/200" alt="" />
        </div>
        <div className="profile__mid--name">
          <h2>{`${firstName} ${lastName}`}</h2>
          <AccountCircleIcon />
        </div>
      </div>
      <div className="profile__bottom">
        <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
          Edit
        </Button>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div>
              <span className="profile__bottom__subject">First Name</span>
            </div>
            <div>
              <span className="profile__bottom__value">{firstName}</span>
            </div>
          </div>
        </div>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div>
              <span className="profile__bottom__subject">Last Name</span>
            </div>
            <div>
              <span className="profile__bottom__value">{lastName}</span>
            </div>
          </div>
        </div>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div>
              <span className="profile__bottom__subject">Email</span>
            </div>
            <div>
              <span className="profile__bottom__value">{email}</span>
            </div>
          </div>
        </div>
        <div className="profile__bottom__item">
          <div className="profile__bottom__item--left">
            <div>
              <span className="profile__bottom__subject">Password</span>
            </div>
            <div>
              <span className="profile__bottom__value">**********</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileData;
