import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Todos from "./components/Todos/Todos";
import { useUserContext } from "./store/user";

function Layout() {
  const { user, isLoggedIn } = useUserContext();
  return (
    <div className="Layout">
      <Navbar />
      <Todos />
      <Outlet />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout;
