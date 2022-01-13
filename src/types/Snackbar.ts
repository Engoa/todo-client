export type SnackBarContent = {
  openSnackBar: boolean;
  message: string;
  setOpenSnackBar: (openSnackBar: boolean) => void;
  setMessage: (message: string) => void;
  toggleSnackBar: (message: string) => void;
};
