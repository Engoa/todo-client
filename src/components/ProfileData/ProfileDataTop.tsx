import React, { FC } from "react";
import { Tooltip, IconButton, ListItemIcon, Menu, MenuItem, Zoom } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

interface IProfileDataTop {
  deleteUserHandler: () => void;
}
const ProfileDataTop: FC<IProfileDataTop> = ({ deleteUserHandler }): JSX.Element => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="profile__top">
        <Tooltip title="Go Back" arrow TransitionComponent={Zoom}>
          <IconButton onClick={() => navigate("/")}>
            <ChevronLeftIcon className="profile__top__backicon" />
          </IconButton>
        </Tooltip>
        <h1>My Account</h1>
        <Tooltip title="More Info" arrow TransitionComponent={Zoom}>
          <IconButton onClick={handleMenuClick}>
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </section>

      <>
        <Menu
          className="delete__user"
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={deleteUserHandler}>
            <ListItemIcon>
              <PersonRemoveIcon fontSize="small" />
            </ListItemIcon>
            Delete Account
          </MenuItem>
        </Menu>
      </>
    </>
  );
};

export default ProfileDataTop;
