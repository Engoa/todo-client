import React, { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import { checkRoute } from "./helpers/utils";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { useUserContext } from "./store/user";
import FetchError from "./components/FetchError/FetchError";
import { useTodosContext } from "./store/todos";

export const RequireAuth: FC = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, fetchUser, user } = useUserContext();
  const { todos } = useTodosContext();
  let location = useLocation();

  useEffect(() => {
    fetchUser();
  }, [location]);
  // if user is not logged in and trying to access home, redirect to auth
  if (!isLoggedIn && !checkRoute(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If user tries to access login or register page while logged in, redirect to home
  else if (isLoggedIn && checkRoute(location.pathname)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  // If no user exists, show error
  if (typeof user !== "object" || !todos) return <FetchError />;

  return children;
};

const Router: FC = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;
