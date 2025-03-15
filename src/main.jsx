import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// app
import App from "./App.jsx";

// style
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
