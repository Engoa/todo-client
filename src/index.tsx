import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import reportWebVitals from "./reportWebVitals";
import appTheme from "./styles/theme";
import "./styles/globals.scss";
import { UserProvider } from "./store/user";
import { TodosProvider } from "./store/todos";
import { LoaderProvider } from "./store/loader";

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

reportWebVitals();
