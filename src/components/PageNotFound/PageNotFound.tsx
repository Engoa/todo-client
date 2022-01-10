import React, { FC } from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "./PageNotFound.scss";
const PageNotFound: FC = (): JSX.Element => {
  return (
    <div className="page__not__found">
      <div className="page__not__found--content">
        <div>
          <h2>Looks like this page went on vacation</h2>
        </div>
        <div>
          <Link to={"/"}>
            <IconButton>
              <HomeIcon color="error" fontSize="large" />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
