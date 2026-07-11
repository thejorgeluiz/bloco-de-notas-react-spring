const API_URL = "http://localhost:8080/notas";

export async function listarNotas() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as notas.");
  }

  return resposta.json();
}

export async function criarNota(texto) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto }),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível criar a nota.");
  }

  return resposta.json();
}

export async function excluirNota(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a nota.");
  }
}

export async function atualizarNota(id, texto) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto }),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar a nota.");
  }

  return resposta.json();
}

export async function alternarFixacao(id) {
  const resposta = await fetch(`${API_URL}/${id}/fixar`, {
    method: "PUT",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível alterar a fixação da nota.");
  }

  return resposta.json();
}