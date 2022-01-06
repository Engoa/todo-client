import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import Todos from "./components/Todos/Todos";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserContext } from "./store/user";

const authRoutes = ["login", "register"];
const checkRoute = (pathname: string): boolean => authRoutes.includes(pathname.split("/")[1]);

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
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

const Router: React.FC = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return (
    <BrowserRouter>
      <RequireAuth>
        <Routes>
          <Route path="/">
            {isLoggedIn && <Route path="/" element={<Layout />} />}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {children}
          </Route>
        </Routes>
      </RequireAuth>
    </BrowserRouter>
  );
};

export default Router;
