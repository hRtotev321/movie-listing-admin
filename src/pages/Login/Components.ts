import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginBoxGrid = styled(Grid)({
  height: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledPaper = styled("form")(({ theme }) => ({
  width: 400,
  margin: theme.spacing(4, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
}));

export const StyledErrorsBox = styled("div")({
  height: 50,
});

export const StyledFormTitle = styled(Typography)({
  padding: 6,
  fontSize: 20,
  fontWeight: 700,
});
