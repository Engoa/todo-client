import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";
import appTheme from "./theme";
import "./styles/globals.scss";
import { UserProvider } from "./store/user";

ReactDOM.render(
  <UserProvider>
    <ThemeProvider theme={appTheme}>
      <Router />
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);

reportWebVitals();
