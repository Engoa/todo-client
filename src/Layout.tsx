import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "./store/user";

function Layout() {
  const { user, isLoggedIn } = useUserContext();

  return (
    <div className="App">
      {/* <nav></nav> */}
      {/* <header></header> */}
      {/* <main> */}
      <Outlet />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout;
