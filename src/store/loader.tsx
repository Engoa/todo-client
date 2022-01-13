import React, { createContext, useContext } from "react";
import { LoaderContent } from "../types/Loader";

export const LoaderContext = createContext<LoaderContent>({} as LoaderContent);
export const useLoaderContext = () => useContext(LoaderContext);

export const LoaderProvider: React.FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return <LoaderContext.Provider value={{ loading, setLoading }}>{children}</LoaderContext.Provider>;
};
