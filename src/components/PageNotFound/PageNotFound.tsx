import React, { FC } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

const PageNotFound: FC = (): JSX.Element => {
  return (
    <div className="page__not__found">
      <div className="page__not__found--content">
        <div className="page__not__found--top">
          <h1>404</h1>
        </div>
        <div className="page__not__found--mid">
          <h3>Seems like you're lost</h3>
        </div>
        <div className="page__not__found--bottom">
          <Link to={"/"}>
            <Button variant="contained">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
