import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./app/context/AuthContext";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
