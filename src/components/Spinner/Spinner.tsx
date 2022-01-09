import { CircularProgress } from "@mui/material";
import React from "react";
import { useLoaderContext } from "../../store/loader";

const Spinner = () => {
  const { loading } = useLoaderContext();

  return (
    <React.Fragment>
      {!loading ? null : (
        <div className="spinner--wrapper">
          <CircularProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default Spinner;
