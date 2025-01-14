import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PoaContextProvider } from "./context/PoaContextProvider.jsx";
import { InputBarjasContextProvider } from "./context/InputBarjasContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PoaContextProvider>
        <InputBarjasContextProvider>
          <App />
        </InputBarjasContextProvider>
      </PoaContextProvider>
    </BrowserRouter>
  </StrictMode>
);
