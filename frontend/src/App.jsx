import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [notas, setNotas] = useState([]);
  async function salvarNota() {
    const resposta = await fetch("http://localhost:8080/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texto: texto,
      }),
    });

    const nota = await resposta.json();

    console.log(nota);

    setTexto("");

    carregarNotas();
  }

  async function carregarNotas() {
    const resposta = await fetch("http://localhost:8080/notas");

    const dados = await resposta.json();

    setNotas(dados);
  }

  async function excluirNota(id) {
    await fetch(`http://localhost:8080/notas/${id}`, {
      method: "DELETE",
    });

    carregarNotas();
  }

  async function atualizarNota(id, textoAtual) {
    const novoTexto = prompt("Digite o novo texto:", textoAtual);

    if (novoTexto === null) {
      return;
    }

    await fetch(`http://localhost:8080/notas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texto: novoTexto,
      }),
    });

    carregarNotas();
  }

  useEffect(() => {
    carregarNotas();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bloco de Notas</h1>

      <textarea
        className="form-control"
        rows="5"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      ></textarea>

      <button className="btn btn-primary mt-3" onClick={salvarNota}>
        Salvar
      </button>

      <hr />

      <h3>Notas</h3>
      <ul className="list-group mt-3">
        {notas.map((nota) => (
          <li
            key={nota.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {nota.texto}

            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => atualizarNota(nota.id, nota.texto)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => excluirNota(nota.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
