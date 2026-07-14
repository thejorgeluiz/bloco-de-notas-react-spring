import { Navigate } from "react-router-dom";

import { usuarioEstaLogado } from "../services/api";

function RotaProtegida({ children }) {
  if (!usuarioEstaLogado()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaProtegida;