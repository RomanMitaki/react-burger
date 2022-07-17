import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app.jsx";
import "./vendor/normalize.module.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);