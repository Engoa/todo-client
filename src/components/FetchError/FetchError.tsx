import React, { FC } from "react";
import "./FetchError.scss";
const FetchError: FC = (): JSX.Element => {
  return (
    <>
      <h2>Error occured while fetching, please try again at a later date!</h2>
    </>
  );
};

export default FetchError;
