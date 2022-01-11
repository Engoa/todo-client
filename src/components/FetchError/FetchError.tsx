import React, { FC } from "react";
import "./FetchError.scss";
const FetchError: FC = (): JSX.Element => {
  return (
    <>
      <h1>Error occured while fetching, please try again at a later date!</h1>
    </>
  );
};

export default FetchError;
