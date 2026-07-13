import { useEffect, useState } from "react";

import {
  listarNotas,
  criarNota,
  excluirNota,
  atualizarNota,
  alternarFixacao,
} from "./services/api";

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
      const dados = await listarNotas();
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
        await atualizarNota(idEditando, texto);
        setIdEditando(null);

        exibirNotificacao("Nota atualizada com sucesso!", "success");
      } else {
        await criarNota(texto);

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
      const notaAtualizada = await alternarFixacao(id);

      await carregarNotas();

      exibirNotificacao(
        notaAtualizada.fixada
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
      await excluirNota(id);
      await carregarNotas();

      exibirNotificacao("Nota movida para a lixeira!", "success");
    } catch (error) {
      exibirNotificacao(error.message, "danger");
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
