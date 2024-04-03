import React, { useEffect } from "react";
import { useAuth, useLoading } from "./hooks";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./enums";
import AppBarNav from "../components/AppBarNav/AppBarNav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useLoading();
  const navigation = useNavigate();
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigation(ROUTES.LOGIN);
    }
  }, [user]);

  return (
    <Box sx={{ maxWidth: 1440, margin: "auto" }}>
      <AppBarNav />
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ margin: 16 }}>{children}</div>
    </Box>
  );
};

export default Layout;
