import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import ScrollToTop from "./Components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <ScrollToTop />
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
