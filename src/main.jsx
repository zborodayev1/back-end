import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Test } from "../client/Tests";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Test />
  </StrictMode>,
);
