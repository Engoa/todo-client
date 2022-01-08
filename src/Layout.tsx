import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Todos from "./components/Todos/Todos";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="Layout">
        <Todos />
        <Outlet />
        {/* </main> */}
        {/* <footer></footer> */}
      </div>
    </>
  );
}

export default Layout;
