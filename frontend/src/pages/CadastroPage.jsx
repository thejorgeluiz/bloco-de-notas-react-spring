import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cadastrarUsuario } from "../services/api";

function CadastroPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerCadastro(evento) {
    evento.preventDefault();
    setErro("");

    if (senha.length < 8) {
      setErro("A senha deve possuir pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmacaoSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    setCarregando(true);

    try {
      await cadastrarUsuario(nome, email, senha);
      navigate("/login");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-sm w-100" style={{ maxWidth: "460px" }}>
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-4">Criar conta</h1>

          {erro && <div className="alert alert-danger">{erro}</div>}

          <form onSubmit={fazerCadastro}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>

              <input
                id="nome"
                type="text"
                className="form-control"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                autoComplete="name"
                required
              />
            </div>

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
                autoComplete="new-password"
                minLength="8"
                required
              />

              <div className="form-text">Use pelo menos 8 caracteres.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmacaoSenha" className="form-label">
                Confirmar senha
              </label>

              <input
                id="confirmacaoSenha"
                type="password"
                className="form-control"
                value={confirmacaoSenha}
                onChange={(evento) => setConfirmacaoSenha(evento.target.value)}
                autoComplete="new-password"
                minLength="8"
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
                  Cadastrando...
                </>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Já possui uma conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default CadastroPage;
