import React, { FC } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackBarContext } from "../../store/snackbar";

const SimpleSnackBar: FC = (): JSX.Element => {
  const { openSnackBar, setOpenSnackBar, message } = useSnackBarContext();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Snackbar open={openSnackBar} autoHideDuration={4000} onClose={handleClose} message={message} action={action} />
    </div>
  );
};
export default SimpleSnackBar;
