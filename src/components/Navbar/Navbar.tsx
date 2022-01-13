import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useUserContext } from "../../store/user";
import { Link } from "react-router-dom";
import { isMobile } from "../../helpers/utils";
import { userAvatarAnimation } from "../../animations/animations";
import "./Navbar.scss";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const avatarRef = React.useRef();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    userAvatarAnimation(avatarRef);
  }, []);
  return (
    <div className="nav">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <Tooltip title="Account" arrow>
          <IconButton
            ref={avatarRef}
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }} src={user.avatar} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            mt: 1,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: isMobile ? 17 : 42,
              width: 10,
              height: 10,
              bgcolor: "#e0e0e0",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={`/profile/${user._id}`}>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Account Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
