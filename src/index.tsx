import React from "react";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom";
import appTheme from "./styles/theme";
import { MainProvider } from "./store/main";
import "./styles/globals.scss";

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <MainProvider>
      <App />
    </MainProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
