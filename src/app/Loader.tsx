import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  const loading = false;
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
