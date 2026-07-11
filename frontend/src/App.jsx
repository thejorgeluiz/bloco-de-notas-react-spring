import "./App.css";
import { useEffect, useState } from "react";
import {
  listarNotas,
  criarNota,
  excluirNota,
  atualizarNota,
  alternarFixacao,
} from "./services/api";
import FormularioNota from "./components/FormularioNota";
import ListaNotas from "./components/ListaNotas";

function App() {
  const [texto, setTexto] = useState("");
  const [notas, setNotas] = useState([]);
  const [busca, setBusca] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  async function fixarNota(id) {
    await alternarFixacao(id);
    carregarNotas();
  }

  async function salvarNota() {
    if (texto.trim() === "") {
      alert("Digite uma nota antes de salvar.");
      return;
    }

    if (idEditando !== null) {
      await atualizarNota(idEditando, texto);
      setIdEditando(null);
    } else {
      await criarNota(texto);
    }

    setTexto("");
    carregarNotas();
  }

  async function carregarNotas() {
    const dados = await listarNotas();

    setNotas(dados);
  }

  async function removerNota(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta nota?",
    );

    if (!confirmar) {
      return;
    }

    await excluirNota(id);

    carregarNotas();
  }

  function editarNota(id, textoAtual) {
    setIdEditando(id);
    setTexto(textoAtual);
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

  const notasOrdenadas = [...notasFiltradas].sort(
    (a, b) => Number(b.fixada) - Number(a.fixada),
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bloco de Notas</h1>

      <FormularioNota
        texto={texto}
        setTexto={setTexto}
        salvarNota={salvarNota}
        idEditando={idEditando}
        cancelarEdicao={cancelarEdicao}
      />

      <hr />
      <input
        type="text"
        className="form-control mt-4"
        placeholder="Buscar nota..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <ListaNotas
        notas={notasOrdenadas}
        editarNota={editarNota}
        removerNota={removerNota}
        fixarNota={fixarNota}
      />
    </div>
  );
}

export default App;
