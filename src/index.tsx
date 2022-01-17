import React from "react";
import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom";
import appTheme from "./styles/theme";
import { UserProvider } from "./store/user";
import { TodosProvider } from "./store/todos";
import { LoaderProvider } from "./store/loader";
import { SnackBarProvider } from "./store/snackbar";
import App from "./App";
import "./styles/globals.scss";

ReactDOM.render(
  <LoaderProvider>
    <SnackBarProvider>
      <TodosProvider>
        <UserProvider>
          <ThemeProvider theme={appTheme}>
            <App />
          </ThemeProvider>
        </UserProvider>
      </TodosProvider>
    </SnackBarProvider>
  </LoaderProvider>,
  document.getElementById("root")
);
