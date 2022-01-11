import React, { FC } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useUserContext } from "../../store/user";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { updateUserScheme } from "../../schemes/authSchemes";
import { IUser } from "../../types/User";
import { useLoaderContext } from "../../store/loader";
import { useSnackBarContext } from "../../store/snackbar";
import { profilePageAnimation } from "../../animations/animations";
import { differenceBetweenObjects } from "../../helpers/utils";
import AvatarModal from "../AvatarModal/AvatarModal";
import avatarPlaceHolder from "../../assets/images/avatar.svg";
import EditIcon from "@mui/icons-material/Edit";
import _ from "lodash";
import "./ProfileData.scss";

const ProfileData: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const { setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();
  const [userForm, setUserForm] = React.useState<IUser>(user);
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  // const [imageForm, setImageForm] = React.useState<string>("");

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [key]: event.target.value.trim() });
  };

  const toggleModalHandler = () => {
    setToggleModal(!toggleModal);
  };

  const onImageBroken = (e) => {
    e.target.src = avatarPlaceHolder;
    setUser({ ...user, avatar: avatarPlaceHolder });
    toggleSnackBar("Image link is broken, resetting to default avatar");
  };

  const updateUser = async () => {
    setUserErrors([]);
    const isValid = await updateUserScheme.validate(userForm, { abortEarly: false }).catch((err) => err.errors);
    if (Array.isArray(isValid)) return setUserErrors(isValid);
    // If not valid return and show errors.
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

  const updateUserAvatar = async () => {
    setUserErrors([]);
    if (!userForm.avatar) return;
    if (userForm.avatar === user.avatar) return setUserErrors(["Please select a new avatar"]);
    try {
      const { email, ...rest } = user;
      const updatedUser = { ...rest, avatar: userForm.avatar };
      await UserService.updateUserImage(user._id, updatedUser);
      setUser({ ...updatedUser, email });
      toggleSnackBar("User avatar updated successfully");
    } catch (err: any) {
      console.log(err);
      toggleSnackBar("An error occured while updating avatar image");
    }
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
        userErrors={userErrors}
      />

      <div className="profile__top">
        <Tooltip title="Go Back" arrow>
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="profile__top__backicon" />
          </IconButton>
        </Tooltip>
        <h1>My Account</h1>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="profile__mid" ref={profilePageRef}>
        <div className="profile__mid--img" onClick={toggleModalHandler}>
          <img src={!user.avatar ? avatarPlaceHolder : user.avatar} alt="User Image" onError={onImageBroken} />
          <div className="profile__mid--img--icon">
            <EditIcon fontSize="small" />
          </div>
        </div>
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </div>
      <div className="profile__bottom">
        <Button variant="contained" disabled={_.isEqual(user, userForm) ? true : false} onClick={updateUser}>
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
      {userErrors.length ? (
        <ul className="auth__errors" style={{ alignItems: "center" }}>
          {userErrors.map((err: string, index: number) => (
            <li key={index} className="auth__error">
              {err}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default ProfileData;
