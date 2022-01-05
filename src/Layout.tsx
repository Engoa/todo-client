import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "./store/user";

function Layout() {
  const { user, isLoggedIn } = useUserContext();

  return (
    <div className="App">
      {/* <nav></nav> */}
      <h5>{JSON.stringify(isLoggedIn)}</h5>
      {/* <header></header> */}
      {/* <main> */}
      <Outlet />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout;
