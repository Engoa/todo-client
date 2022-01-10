import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useUserContext } from "../../store/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import React, { FC } from "react";
import _ from "lodash";
import { UserService } from "../../services/user.service";
import { updateUserScheme } from "../../schemes/authSchemes";
import { IUser } from "../../types/User";
import { useLoaderContext } from "../../store/loader";
import { useSnackBarContext } from "../../store/snackbar";
import { profilePageAnimation } from "../../animations/animations";

const ProfileData: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const { firstName, lastName, email } = user;
  const [userForm, setUserForm] = React.useState<IUser>(user);
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);
  const { setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement> & any) => {
    setUserForm({ ...userForm, [key]: event.target.value.trim() });
  };

  const difference = (object: Object, base: Object) => {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
        }
      });
    }
    return changes(object, base);
  };
  const updateUser = async () => {
    const isValid = await updateUserScheme.validate(userForm, { abortEarly: false }).catch((err) => err.errors);
    if (Array.isArray(isValid)) return setUserErrors(isValid);
    // If not valid return and show errors.
    try {
      setLoading(true);
      const updatedFields = difference(userForm, user);
      await UserService.updateUser(user._id, updatedFields);
      const updatedUser = Object.assign(user, updatedFields);
      setUser(updatedUser);
      toggleSnackBar("User updated successfully");
    } catch (err: any) {
      console.log(err);
      setUserErrors([err.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  const profilePageRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    profilePageAnimation(profilePageRef);
  }, []);
  return (
    <>
      <div className="profile__top">
        <Tooltip title="Go Back" arrow>
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <h1>My Account</h1>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="profile__mid" ref={profilePageRef}>
        <div className="profile__mid--img">
          <img src="https://picsum.photos/200" alt="User Image" />
        </div>
        <div className="profile__mid--name">
          <span>{`${firstName} ${lastName}`}</span>
          <AccountCircleIcon />
        </div>
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
                defaultValue={firstName}
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
                defaultValue={lastName}
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
                defaultValue={email}
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
              * {err}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default ProfileData;
