import React from "react";
import ReactDOM from "react-dom/client";

import Title from "~/components/Title";
import App from "~/containers/App";

import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <App />
      <Title value="Hello World!" />
    </>
  </React.StrictMode>
);
