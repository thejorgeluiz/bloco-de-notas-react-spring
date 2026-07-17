import { useEffect, useState } from "react";

import {
  listarNotas,
  criarNota,
  excluirNota,
  atualizarNota,
  alternarFixacao,
  usuarioEstaLogado,
} from "./services/api";

import {
  listarNotasLocais,
  criarNotaLocal,
  excluirNotaLocal,
  atualizarNotaLocal,
  alternarFixacaoLocal,
  excluirNotaLocalDefinitivamente,
} from "./services/notasLocais";

import BarraTopo from "./components/BarraTopo";
import FormularioNota from "./components/FormularioNota";
import ListaNotas from "./components/ListaNotas";
import Notificacao from "./components/Notificacao";

function App() {
  const [texto, setTexto] = useState("");
  const [notas, setNotas] = useState([]);
  const [busca, setBusca] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [importando, setImportando] = useState(false);
  const [notasLocaisPendentes, setNotasLocaisPendentes] = useState([]);

  const modoVisitante = !usuarioEstaLogado();

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

  async function carregarNotas() {
    try {
      const dados = modoVisitante ? listarNotasLocais() : await listarNotas();

      setNotas(dados);
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    }
  }

  async function salvarNota() {
    if (texto.trim() === "") {
      exibirNotificacao("Digite uma nota antes de salvar.", "warning");
      return;
    }

    try {
      setSalvando(true);

      if (idEditando !== null) {
        if (modoVisitante) {
          atualizarNotaLocal(idEditando, texto);
        } else {
          await atualizarNota(idEditando, texto);
        }

        setIdEditando(null);

        exibirNotificacao("Nota atualizada com sucesso!", "success");
      } else {
        if (modoVisitante) {
          criarNotaLocal(texto);
        } else {
          await criarNota(texto);
        }

        exibirNotificacao("Nota criada com sucesso!", "success");
      }

      setTexto("");
      await carregarNotas();
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    } finally {
      setSalvando(false);
    }
  }

  async function fixarNota(id) {
    try {
      let notaFicouFixada;

      if (modoVisitante) {
        const notaAtual = notas.find((nota) => nota.id === id);

        alternarFixacaoLocal(id);

        notaFicouFixada = !notaAtual.fixada;
      } else {
        const notaAtualizada = await alternarFixacao(id);

        notaFicouFixada = notaAtualizada.fixada;
      }

      await carregarNotas();

      exibirNotificacao(
        notaFicouFixada
          ? "Nota fixada com sucesso!"
          : "Nota desafixada com sucesso!",
        "success",
      );
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    }
  }

  async function removerNota(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja mover esta nota para a lixeira?",
    );

    if (!confirmar) {
      return;
    }

    try {
      if (modoVisitante) {
        excluirNotaLocal(id);
      } else {
        await excluirNota(id);
      }

      await carregarNotas();

      exibirNotificacao("Nota movida para a lixeira!", "success");
    } catch (error) {
      exibirNotificacao(error.message, "danger");
    }
  }

  async function importarNotasLocais() {
    if (notasLocaisPendentes.length === 0) {
      return;
    }

    const confirmar = window.confirm(
      `Deseja salvar ${notasLocaisPendentes.length} nota(s) local(is) na sua conta?`,
    );

    if (!confirmar) {
      return;
    }

    let quantidadeImportada = 0;

    try {
      setImportando(true);

      for (const notaLocal of notasLocaisPendentes) {
        const notaCriada = await criarNota(notaLocal.texto);

        excluirNotaLocalDefinitivamente(notaLocal.id);
        quantidadeImportada += 1;

        if (notaLocal.fixada) {
          await alternarFixacao(notaCriada.id);
        }
      }

      setNotasLocaisPendentes([]);
      await carregarNotas();

      exibirNotificacao(
        `${quantidadeImportada} nota(s) importada(s) com sucesso!`,
        "success",
      );
    } catch (error) {
      setNotasLocaisPendentes(listarNotasLocais());

      exibirNotificacao(
        `${quantidadeImportada} nota(s) foram importadas. ${error.message}`,
        "danger",
      );
    } finally {
      setImportando(false);
    }
  }

  function editarNota(id, textoAtual) {
    setIdEditando(id);
    setTexto(textoAtual);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelarEdicao() {
    setIdEditando(null);
    setTexto("");
  }

  useEffect(() => {
    carregarNotas();

    if (!modoVisitante) {
      setNotasLocaisPendentes(listarNotasLocais());
    }
  }, []);

  const notasFiltradas = notas.filter((nota) =>
    nota.texto.toLowerCase().includes(busca.toLowerCase()),
  );

  const notasOrdenadas = [...notasFiltradas].sort((a, b) => {
    const diferencaFixacao = Number(b.fixada) - Number(a.fixada);

    if (diferencaFixacao !== 0) {
      return diferencaFixacao;
    }

    const dataA = new Date(a.dataAtualizacao || a.dataCriacao).getTime();

    const dataB = new Date(b.dataAtualizacao || b.dataCriacao).getTime();

    return dataB - dataA;
  });

  return (
    <>
      <BarraTopo />

      <main className="container py-5">
        {modoVisitante && (
          <div className="alert alert-info">
            Você está usando o modo visitante. Suas notas ficam salvas somente
            neste navegador.
          </div>
        )}

        {!modoVisitante && notasLocaisPendentes.length > 0 && (
          <div className="alert alert-warning d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              Encontramos <strong>{notasLocaisPendentes.length}</strong> nota(s)
              do modo visitante neste navegador.
            </div>

            <button
              type="button"
              className="btn btn-warning"
              onClick={importarNotasLocais}
              disabled={importando}
            >
              {importando ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  />
                  Importando...
                </>
              ) : (
                "Salvar na minha conta"
              )}
            </button>
          </div>
        )}

        <FormularioNota
          texto={texto}
          setTexto={setTexto}
          salvarNota={salvarNota}
          idEditando={idEditando}
          cancelarEdicao={cancelarEdicao}
          salvando={salvando}
        />

        <hr />

        <input
          type="text"
          className="form-control mt-4"
          placeholder="Buscar nota..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />

        <ListaNotas
          notas={notasOrdenadas}
          editarNota={editarNota}
          removerNota={removerNota}
          fixarNota={fixarNota}
        />
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

export default App;
