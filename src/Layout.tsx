import React from "react";
import { CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Todos from "./components/Todos/Todos";
import { useLoaderContext } from "./store/loader";
import Footer from "./components/Footer/Footer";

function Layout() {
  const { loading } = useLoaderContext();
  return (
    <>
      <Navbar />
      <div className="Layout">
        <Todos />
        <Footer />
        <Outlet />
        {!loading ? null : (
          <div className="spinner--wrapper">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
}

export default Layout;
