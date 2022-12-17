import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/admin";
import "./index.scss";

Amplify.configure(config);

ReactDOM.render(
  <AmplifyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </AmplifyProvider>,
  document.getElementById("root")
);
