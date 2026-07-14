import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import LixeiraPage from "./pages/LixeiraPage.jsx";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import RotaProtegida from "./components/RotaProtegida";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RotaProtegida>
              <App />
            </RotaProtegida>
          }
        />
        <Route
          path="/lixeira"
          element={
            <RotaProtegida>
              <LixeiraPage />
            </RotaProtegida>
          }
        />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
