import React from "react";
import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom";
import Router from "./Router";
import appTheme from "./styles/theme";
import { UserProvider } from "./store/user";
import { TodosProvider } from "./store/todos";
import { LoaderProvider } from "./store/loader";
import "./styles/globals.scss";

ReactDOM.render(
  <LoaderProvider>
    <UserProvider>
      <TodosProvider>
        <ThemeProvider theme={appTheme}>
          <Router />
        </ThemeProvider>
      </TodosProvider>
    </UserProvider>
  </LoaderProvider>,
  document.getElementById("root")
);
