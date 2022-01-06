import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Todos from "./components/Todos/Todos";
import { useUserContext } from "./store/user";

function Layout() {
  const { user, isLoggedIn } = useUserContext();
  return (
    <div className="Layout">
      {/* <nav></nav> */}
      {/* <Header /> */}
      <Todos />
      <Outlet />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout;
