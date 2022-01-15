import React from "react";
import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom";
import Router from "./Router";
import appTheme from "./styles/theme";
import { UserProvider } from "./store/user";
import { TodosProvider } from "./store/todos";
import { LoaderProvider } from "./store/loader";
import { SnackBarProvider } from "./store/snackbar";
import Spinner from "./components/Spinner/Spinner";
import SimpleSnackBar from "./components/SimpleSnackBar/SimpleSnackBar";
import "./styles/globals.scss";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <LoaderProvider>
    <SnackBarProvider>
      <TodosProvider>
        <UserProvider>
          <ThemeProvider theme={appTheme}>
            <Router />
            <Spinner />
            <SimpleSnackBar />
            <ScrollToTop />
          </ThemeProvider>
        </UserProvider>
      </TodosProvider>
    </SnackBarProvider>
  </LoaderProvider>,
  document.getElementById("root")
);
