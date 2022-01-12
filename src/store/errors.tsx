import React, { createContext, useContext } from "react";

// export type ErrorsContent = {
//   userErrors: string[];
//   setUserErrors: (userErrors: string[]) => void;
// };

// export const ErrorsContext = createContext<ErrorsContent>({} as ErrorsContent);
// export const useErrorsContext = () => useContext(ErrorsContext);

// export const ErrorsProvider: React.FC = ({ children }): JSX.Element => {
//   const [userErrors, setUserErrors] = React.useState<Array<string>>([]);

//   return <ErrorsContext.Provider value={{ userErrors, setUserErrors }}>{children}</ErrorsContext.Provider>;
// };
