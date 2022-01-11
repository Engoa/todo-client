import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useUserContext } from "../../store/user";
import "./AvatarModal.scss";

interface IModal {
  toggleModal: boolean;
  setToggleModal: (toggle: boolean) => void;
  handleChange: (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateUserAvatar: () => void;
  userErrors: Array<string>;
}

const AvatarModal: FC<IModal> = ({ toggleModal, setToggleModal, handleChange, updateUserAvatar, userErrors }): JSX.Element => {
  const { user } = useUserContext();

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
            defaultValue={user.avatar}
            label={"Avatar URL"}
            onChange={handleChange("avatar")}
            spellCheck={false}
            autoComplete="off"
          />
          {userErrors.length ? (
            <ul className="auth__errors" style={{ alignItems: "center" }}>
              {userErrors.map((err: string, index: number) => (
                <li key={index} className="auth__error">
                  {err}
                </li>
              ))}
            </ul>
          ) : null}
          <Button variant="contained" onClick={updateUserAvatar}>
            Save
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AvatarModal;
