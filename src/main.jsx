import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PoaContextProvider } from "./context/PoaContextProvider.jsx";
import { InputBarjasContextProvider } from "./context/InputBarjasContextProvider.jsx";
import { RukDataContextProvider } from "./context/RukDataContextProvider.jsx";
RukDataContextProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PoaContextProvider>
        <InputBarjasContextProvider>
          <RukDataContextProvider>
            <App />
          </RukDataContextProvider>
        </InputBarjasContextProvider>
      </PoaContextProvider>
    </BrowserRouter>
  </StrictMode>
);
