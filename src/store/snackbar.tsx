import React, { createContext, FC, useContext } from "react";

export type SnackBarContent = {
  openSnackBar: boolean;
  message: string;
  setOpenSnackBar: (openSnackBar: boolean) => void;
  setMessage: (message: string) => void;
  toggleSnackBar: (message: string) => void;
};

export const SnackBarContext = createContext<SnackBarContent>({} as SnackBarContent);
export const useSnackBarContext = () => useContext(SnackBarContext);

export const SnackBarProvider: FC = ({ children }): JSX.Element => {
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const toggleSnackBar = (message: string) => {
    setOpenSnackBar(true);
    setMessage(message);
  };

  return (
    <SnackBarContext.Provider value={{ openSnackBar, setOpenSnackBar, message, setMessage, toggleSnackBar }}>{children}</SnackBarContext.Provider>
  );
};
