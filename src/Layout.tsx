import { Snackbar } from "@mui/material";
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
      {/* <Snackbar open={open} autoHideDuration={6000} message="Note archived" /> */}
    </div>
  );
}

export default Layout;
