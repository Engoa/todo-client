import React, { FC, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SimpleSnackBar from "./components/SimpleSnackBar/SimpleSnackBar";
import Spinner from "./components/Spinner/Spinner";
import Router from "./Router";
import { useUserContext } from "./store/user";

interface IApp {
  children?: JSX.Element;
}
const App: FC<IApp> = ({ children }): JSX.Element => {
  const { fetchUser } = useUserContext();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      <Router />
      <Spinner />
      <SimpleSnackBar />
      <ScrollToTop />
      <Footer />
      {children}
    </div>
  );
};

export default App;
