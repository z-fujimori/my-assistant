import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import TestContainer from "./test/TestContainer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <TestContainer /> */}
  </React.StrictMode>,
);
