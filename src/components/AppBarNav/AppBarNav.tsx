import { AppBar, Grid, Typography } from "@mui/material";
import React from "react";
import { logout } from "../../firebase/firebase";
import { useAuth, useLoading } from "../../app/hooks";
import { StyledNavLink } from "./Components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/enums";

const AppBarNav: React.FC = () => {
  const { setLoadingState } = useLoading();
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectTo = (route: ROUTES) => () => navigate(route);

  const handleLogout = async () => {
    setLoadingState(true);
    await logout();
    setLoadingState(false);
  };

  return (
    <AppBar position="static">
      <Grid container alignItems="center">
        <Grid sx={{ justifyContent: "center", display: "flex" }} xs={1} item>
          <StyledNavLink
            onClick={redirectTo(ROUTES.HOME)}
            variant="outlined"
            color="inherit"
          >
            HOME
          </StyledNavLink>
        </Grid>
        <Grid xs={7} item>
          <StyledNavLink
            onClick={redirectTo(ROUTES.CREATE_MOVIE)}
            variant="outlined"
            color="inherit"
          >
            ADD MOVIE
          </StyledNavLink>
        </Grid>
        <Grid xs={2} item>
          <Typography align="right">{user?.email}</Typography>
        </Grid>
        <Grid xs={2} item>
          <StyledNavLink
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            sign out
          </StyledNavLink>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default AppBarNav;
