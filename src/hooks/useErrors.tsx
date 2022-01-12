import React from "react";

const useErrors = () => {
  const [userErrors, setUserErrors] = React.useState<Array<string>>([]);

  const validateSchemes = async (scheme: any, form: Object) => {
    setUserErrors([]);
    const isValid = await scheme.validate(form, { abortEarly: false }).catch((err: any) => err.errors);
    const isArray = Array.isArray(isValid);

    if (isArray) setUserErrors(isValid);

    return isArray;
    // If not valid return and show errors.
  };

  return { userErrors, setUserErrors, validateSchemes };
};

export default useErrors;
