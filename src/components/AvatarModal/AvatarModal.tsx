import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useUserContext } from "../../store/user";
import UserErrors from "../UserErrors/UserErrors";
import "./AvatarModal.scss";

interface IModal {
  toggleModal: boolean;
  setToggleModal: (toggle: boolean) => void;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUserAvatar: () => void;
  resetUserAvatar: () => void;
  imageInputForm: string;
  userErrors: string[];
}

const AvatarModal: FC<IModal> = ({
  toggleModal,
  setToggleModal,
  handleChange,
  updateUserAvatar,
  resetUserAvatar,
  imageInputForm,
  userErrors,
}): JSX.Element => {
  const { user } = useUserContext();

  const handleDisabledButton = (condition1: any, condition2: any): boolean => {
    if (!imageInputForm) return true;
    if (condition1 === condition2) return true;
    return false;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={toggleModal}
      onClose={setToggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={toggleModal}>
        <Box className="modal">
          <TextField
            name="avatar"
            value={imageInputForm}
            label={"Avatar URL"}
            onChange={handleChange("avatar")}
            spellCheck={false}
            autoComplete="off"
          />
          <UserErrors userErrors={userErrors} />
          <Button variant="contained" onClick={updateUserAvatar} disabled={handleDisabledButton(imageInputForm, user.avatar)}>
            Save
          </Button>
          <Button variant="contained" onClick={resetUserAvatar} disabled={handleDisabledButton("", user.avatar)}>
            Reset to default
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AvatarModal;
