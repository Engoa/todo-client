import React from "react";
import { CircularProgress } from "@mui/material";
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
