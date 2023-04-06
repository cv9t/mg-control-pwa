import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/containers/App/App";

import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
