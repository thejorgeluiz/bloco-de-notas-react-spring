import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  excluirNotaDefinitivamente,
  listarLixeira,
  restaurarNota,
} from "../services/api";

import BarraTopo from "../components/BarraTopo";
import Notificacao from "../components/Notificacao";
import NotaExcluidaItem from "../components/NotaExcluidaItem";

function LixeiraPage() {
  const [notas, setNotas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [notificacao, setNotificacao] = useState({
    mostrar: false,
    mensagem: "",
    tipo: "success",
  });

  function exibirNotificacao(mensagem, tipo = "success") {
    setNotificacao({
      mostrar: true,
      mensagem,
      tipo,
    });
  }

  async function carregarLixeira() {
    try {
      setCarregando(true);

      const dados = await listarLixeira();
      setNotas(dados);
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    } finally {
      setCarregando(false);
    }
  }

  async function restaurar(id) {
    try {
      await restaurarNota(id);
      await carregarLixeira();

      exibirNotificacao("Nota restaurada com sucesso!", "success");
    } catch (error) {
      exibirNotificacao(error.message, "danger");
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
      await carregarLixeira();

      exibirNotificacao("Nota excluída definitivamente.", "success");
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    }
  }

  useEffect(() => {
    carregarLixeira();
  }, []);

  return (
    <>
      <BarraTopo />

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2 mb-0">🗑️ Lixeira</h1>

          <Link to="/" className="btn btn-outline-primary">
            ← Voltar
          </Link>
        </div>

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
          <div className="row g-3">
            {notas.map((nota) => (
              <div className="col-12 col-md-6 col-lg-4" key={nota.id}>
                <NotaExcluidaItem
                  nota={nota}
                  restaurar={restaurar}
                  excluirDefinitivamente={excluirDefinitivamente}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Notificacao
        mostrar={notificacao.mostrar}
        mensagem={notificacao.mensagem}
        tipo={notificacao.tipo}
        aoFechar={() =>
          setNotificacao((notificacaoAtual) => ({
            ...notificacaoAtual,
            mostrar: false,
          }))
        }
      />
    </>
  );
}

export default LixeiraPage;
