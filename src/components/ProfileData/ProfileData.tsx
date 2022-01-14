import React, { FC } from "react";
import { useUserContext } from "../../store/user";
import { UserService } from "../../services/user.service";
import { updateAvatarScheme, updateUserScheme } from "../../schemes/authSchemes";
import { IUser } from "../../types/User";
import { useLoaderContext } from "../../store/loader";
import { useSnackBarContext } from "../../store/snackbar";
import { profilePageAnimation } from "../../animations/animations";
import { differenceBetweenObjects } from "../../helpers/utils";
import AvatarModal from "../AvatarModal/AvatarModal";
import useErrors from "../../hooks/useErrors";
import ProfileDataBottom from "./ProfileDataBottom";
import ProfileDataMid from "./ProfileDataMid";
import ProfileDataTop from "./ProfileDataTop";
import "./ProfileData.scss";

const ProfileData: FC = (): JSX.Element => {
  const { user, setUser, logout } = useUserContext();
  const [userForm, setUserForm] = React.useState<IUser>(user);
  const { setLoading } = useLoaderContext();
  const { toggleSnackBar } = useSnackBarContext();
  const { validateSchemes, setUserErrors, userErrors } = useErrors();
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);

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
      <ProfileDataTop deleteUserHandler={deleteUserHandler} />
      <section className="mid__bottom__wrapper">
        <ProfileDataMid profilePageRef={profilePageRef} toggleModalHandler={toggleModalHandler} user={user} />
        <ProfileDataBottom
          user={user}
          handleChange={handleChange}
          userForm={userForm}
          updateUser={updateUser}
          logout={logout}
          userErrors={userErrors}
        />
      </section>
      <AvatarModal
        toggleModal={toggleModal}
        setToggleModal={toggleModalHandler}
        handleChange={handleChange}
        updateUserAvatar={updateUserAvatar}
        imageInputForm={userForm.avatar}
        userErrors={userErrors}
        resetUserAvatar={resetUserAvatar}
      />
    </>
  );
};

export default ProfileData;
