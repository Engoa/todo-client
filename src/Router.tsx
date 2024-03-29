import React, { FC } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import { checkRoute } from "./helpers/utils";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { useUserContext } from "./store/user";

export const RequireAuth: FC = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useUserContext();
  let location = useLocation();

  // if user is not logged in and trying to access home, redirect to auth
  if (!isLoggedIn && !checkRoute(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user tries to access login or register page while logged in, redirect to home
  else if (isLoggedIn && checkRoute(location.pathname)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const Router: FC = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return (
    <RequireAuth>
      <Routes>
        <Route path="/">
          {isLoggedIn && <Route path="/" element={<Layout />} />}
          {isLoggedIn && <Route path="profile" element={<ProfilePage />} />}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          {children}
        </Route>
      </Routes>
    </RequireAuth>
  );
};

export default Router;
