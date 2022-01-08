import { CircularProgress } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Todos from "./components/Todos/Todos";
import { useLoaderContext } from "./store/loader";

function Layout() {
  const { loading, setLoading } = useLoaderContext();
  return (
    <>
      <Navbar />
      <div className="Layout">
        <Todos />
        <Outlet />
        {/* <footer></footer> */}
        {loading && (
          <div className="spinner--wrapper">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;
