import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  paddingBottom: 40,
});

export const StyledGridColumn = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const StyledGridImageBox = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});

export const CustomButton = styled(Button)({
  marginTop: 50,
});
