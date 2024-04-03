import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledImage = styled("img")({
  width: "100%",
  objectFit: "contain",
  maxHeight: "70vh",
});

export const StyledGridImageBox = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});

export const GridButtonsBox = styled(Grid)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 40,
  margin: 50,
});

export const InfoBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  border: "solid",
  borderWidth: 1,
  borderColor: theme.palette.grey[300],
  marginBottom: -1,
  padding: 8,
}));

export const StyledTableSorter = styled(Button)(() => ({
  fontWeight: "700",
}));
