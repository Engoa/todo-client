import React, { createContext, useContext } from "react";

export type LoaderContent = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const LoaderContext = createContext<LoaderContent>({} as LoaderContent);
export const useLoaderContext = () => useContext(LoaderContext);

export const LoaderProvider: React.FC = ({ children }): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return <LoaderContext.Provider value={{ loading, setLoading }}>{children}</LoaderContext.Provider>;
};
