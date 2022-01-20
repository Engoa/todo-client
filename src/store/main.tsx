import React, { createContext, useContext } from "react";
import { SnackBarProvider } from "./snackbar";
import { TodosProvider } from "./todos";
import { UserProvider } from "./user";
import { LoaderProvider } from "./loader";

export const MainContext = createContext({});
export const useMainContext = () => useContext(MainContext);

export const MainProvider: React.FC = ({ children }): JSX.Element => {
  return (
    <MainContext.Provider value={""}>
      <LoaderProvider>
        <SnackBarProvider>
          <TodosProvider>
            <UserProvider>{children}</UserProvider>
          </TodosProvider>
        </SnackBarProvider>
      </LoaderProvider>
    </MainContext.Provider>
  );
};
