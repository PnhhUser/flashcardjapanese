import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router.tsx";
import { BrowserRouter } from "react-router";
import { DrawerProvider } from "./core/contexts/DrawerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DrawerProvider>
        <AppRouter />
      </DrawerProvider>
    </BrowserRouter>
  </StrictMode>,
);
