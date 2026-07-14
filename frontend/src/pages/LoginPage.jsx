import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { loginUsuario } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [parametros] = useSearchParams();

  const sessaoExpirada = parametros.get("sessao") === "expirada";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(
    sessaoExpirada ? "Sua sessão expirou. Entre novamente." : "",
  );
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(evento) {
    evento.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      await loginUsuario(email, senha);
      navigate("/");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-sm w-100" style={{ maxWidth: "430px" }}>
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-4">Entrar</h1>

          {erro && <div className="alert alert-danger">{erro}</div>}

          <form onSubmit={fazerLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                className="form-control"
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
