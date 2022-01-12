import React, { FC } from "react";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import { useUserContext } from "../../store/user";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { updateAvatarScheme, updateUserScheme } from "../../schemes/authSchemes";
import { IUser } from "../../types/User";
import { useLoaderContext } from "../../store/loader";
import { useSnackBarContext } from "../../store/snackbar";
import { profilePageAnimation } from "../../animations/animations";
import { differenceBetweenObjects, isMobile } from "../../helpers/utils";
import AvatarModal from "../AvatarModal/AvatarModal";
import EditIcon from "@mui/icons-material/Edit";
import UserErrors from "../UserErrors/UserErrors";
import useErrors from "../../hooks/useErrors";
import isEqual from "lodash/isEqual";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import "./ProfileData.scss";

const ProfileData: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { user, setUser, logout } = useUserContext();
  const { setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();
  const { validateSchemes, setUserErrors, userErrors } = useErrors();
  const [userForm, setUserForm] = React.useState<IUser>(user);
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [key]: event.target.value.trim() });
  };

  const toggleModalHandler = () => {
    setToggleModal(!toggleModal);
    setUserErrors([]);
  };

  const updateUser = async () => {
    if (await validateSchemes(updateUserScheme, userForm)) return;
    try {
      setLoading(true);
      const updatedFields = differenceBetweenObjects(userForm, user);
      await UserService.updateUser(user._id, updatedFields);
      const updatedUser = Object.assign(user, updatedFields);
      setUser(updatedUser);
      toggleSnackBar("User updated successfully");
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserHandler = async () => {
    try {
      setLoading(true);
      await UserService.deleteUser(user._id);
      logout();
      toggleSnackBar("User deleted successfully");
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (avatar: string) => {
    try {
      const { email, ...rest } = user;
      const updatedUser = { ...rest, avatar: avatar };
      await UserService.updateUserImage(user._id, updatedUser);
      setUser({ ...updatedUser, email });
      toggleSnackBar("User avatar updated successfully");
    } catch (err: any) {
      if (!!err.response) setUserErrors([err.response.data.message]);
      else setUserErrors(["An error occured, please try again later"]);
    }
  };

  const updateUserAvatar = async () => {
    if (await validateSchemes(updateAvatarScheme, { avatar: userForm.avatar })) return;
    updateAvatar(userForm.avatar);
  };

  const resetUserAvatar = async () => {
    updateAvatar("");
    setUserForm({ ...userForm, avatar: "" });
  };

  const profilePageRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    profilePageAnimation(profilePageRef);
  }, []);

  return (
    <>
      <AvatarModal
        toggleModal={toggleModal}
        setToggleModal={toggleModalHandler}
        handleChange={handleChange}
        updateUserAvatar={updateUserAvatar}
        imageInputForm={userForm.avatar}
        userErrors={userErrors}
        resetUserAvatar={resetUserAvatar}
      />

      <div className="profile__top">
        <Tooltip title="Go Back" arrow>
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="profile__top__backicon" />
          </IconButton>
        </Tooltip>
        <h1>My Account</h1>
        <IconButton onClick={handleMenuClick}>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="profile__mid" ref={profilePageRef}>
        <div className="profile__mid--img" onClick={toggleModalHandler}>
          <IconButton>
            <Avatar src={user.avatar} sx={{ width: 200, height: 200 }} />
          </IconButton>
          <div className="profile__mid--img--icon">
            <EditIcon fontSize="small" />
          </div>
        </div>
        <div className="profile__mid--name">
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </div>
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
      <UserErrors userErrors={userErrors} />
      <Menu
        className="delete__user"
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
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
  );
};

export default ProfileData;
