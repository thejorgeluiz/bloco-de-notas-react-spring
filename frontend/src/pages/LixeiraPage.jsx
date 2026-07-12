import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listarLixeira,
  restaurarNota,
  excluirNotaDefinitivamente,
} from "../services/api";

function LixeiraPage() {
  const [notas, setNotas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarLixeira() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarLixeira();
      setNotas(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function restaurar(id) {
    try {
      await restaurarNota(id);
      carregarLixeira();
    } catch (error) {
      setErro(error.message);
    }
  }

  async function excluirDefinitivamente(id) {
    const confirmar = window.confirm(
      "Deseja excluir esta nota definitivamente? Esta ação não poderá ser desfeita.",
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirNotaDefinitivamente(id);
      carregarLixeira();
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    carregarLixeira();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🗑️ Lixeira</h1>

        <Link to="/" className="btn btn-outline-primary">
          ← Voltar para as notas
        </Link>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {carregando && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>

          <p className="mt-2">Carregando lixeira...</p>
        </div>
      )}

      {!carregando && notas.length === 0 && (
        <div className="alert alert-secondary text-center">
          A lixeira está vazia.
        </div>
      )}

      {!carregando && notas.length > 0 && (
        <div className="list-group">
          {notas.map((nota) => (
            <div className="list-group-item" key={nota.id}>
              <p className="mb-2">{nota.texto}</p>

              <small className="text-muted d-block mb-3">
                Excluída em{" "}
                {new Date(nota.dataExclusao).toLocaleString("pt-BR")}
              </small>

              <button
                type="button"
                className="btn btn-success btn-sm me-2"
                onClick={() => restaurar(nota.id)}
              >
                Restaurar
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => excluirDefinitivamente(nota.id)}
              >
                Excluir definitivamente
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LixeiraPage;
