import React from "react";
import ReactDOM from "react-dom/client";
import PageRouter from "./PageRouter.tsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import theme from "./theme.ts";
import { ThemeProvider } from "@emotion/react";
import MainContextProvider from "./app/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageRouter />
      </ThemeProvider>
    </MainContextProvider>
  </React.StrictMode>
);
