import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const StyledImage = styled("img")({
  width: "100%",
  maxHeight: "70vh",
  objectFit: "contain",
  // maxHeight:600
});

export const StyledImageLabel = styled("div")({
  position: "absolute",
  left: "50%",
  top: "25%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
  fontSize: 25,
  maxWidth: 300,
  cursor: "pointer",
});

export const StyledPlusIcon = styled(AddBoxIcon)({ fontSize: 120 });
