import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "./store/user";

function Layout() {
  const { user, isLoggedIn } = useUserContext();
  return (
    <div className="Layout">
      {/* <nav></nav> */}
      {/* <header></header> */}
      {/* <main> */}
      {/* <h5>hello</h5> */}

      <Outlet />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}

export default Layout;
