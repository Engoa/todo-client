import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Todos from "../components/Todos/Todos";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="Layout">
        <Navbar />
        <Todos />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
