// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// El punto clave: añadir la ruta de la carpeta donde moviste los estilos
import "./index.css";

// Si App.tsx está en la raíz de src (como se ve en tu imagen), déjalo así:
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
