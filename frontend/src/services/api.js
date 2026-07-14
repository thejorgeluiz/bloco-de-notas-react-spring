const BASE_URL = import.meta.env.VITE_API_URL;
const NOTAS_URL = `${BASE_URL}/notas`;
const AUTH_URL = `${BASE_URL}/auth`;

function obterToken() {
  return localStorage.getItem("token");
}

function criarHeaders(comJson = false) {
  const headers = {};

  if (comJson) {
    headers["Content-Type"] = "application/json";
  }

  const token = obterToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function processarResposta(resposta, mensagemPadrao) {
  if (resposta.status === 401 && obterToken()) {
    sair();

    window.location.replace("/login?sessao=expirada");

    throw new Error("Sua sessão expirou.");
  }

  if (!resposta.ok) {
    let mensagem = mensagemPadrao;

    try {
      const erro = await resposta.json();

      mensagem = erro.mensagem || erro.detail || erro.message || mensagemPadrao;
    } catch {
      // Mantém a mensagem padrão se a resposta não possuir JSON.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return null;
  }

  const conteudo = await resposta.text();

  return conteudo ? JSON.parse(conteudo) : null;
}

export async function cadastrarUsuario(nome, email, senha) {
  const resposta = await fetch(`${AUTH_URL}/cadastro`, {
    method: "POST",
    headers: criarHeaders(true),
    body: JSON.stringify({
      nome,
      email,
      senha,
    }),
  });

  return processarResposta(resposta, "Não foi possível realizar o cadastro.");
}

export async function loginUsuario(email, senha) {
  const resposta = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: criarHeaders(true),
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const dados = await processarResposta(
    resposta,
    "Não foi possível realizar o login.",
  );

  localStorage.setItem("token", dados.token);
  localStorage.setItem("usuario", JSON.stringify(dados.usuario));

  return dados;
}

export async function buscarPerfil() {
  const resposta = await fetch(`${AUTH_URL}/perfil`, {
    headers: criarHeaders(),
  });

  return processarResposta(resposta, "Não foi possível carregar o perfil.");
}

export function obterUsuarioLogado() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return null;
  }

  try {
    return JSON.parse(usuario);
  } catch {
    return null;
  }
}

export function usuarioEstaLogado() {
  return Boolean(obterToken());
}

export function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export async function listarNotas() {
  const resposta = await fetch(NOTAS_URL, {
    headers: criarHeaders(),
  });

  return processarResposta(resposta, "Não foi possível carregar as notas.");
}

export async function criarNota(texto) {
  const resposta = await fetch(NOTAS_URL, {
    method: "POST",
    headers: criarHeaders(true),
    body: JSON.stringify({ texto }),
  });

  return processarResposta(resposta, "Não foi possível criar a nota.");
}

export async function atualizarNota(id, texto) {
  const resposta = await fetch(`${NOTAS_URL}/${id}`, {
    method: "PUT",
    headers: criarHeaders(true),
    body: JSON.stringify({ texto }),
  });

  return processarResposta(resposta, "Não foi possível atualizar a nota.");
}

export async function alternarFixacao(id) {
  const resposta = await fetch(`${NOTAS_URL}/${id}/fixar`, {
    method: "PUT",
    headers: criarHeaders(),
  });

  return processarResposta(
    resposta,
    "Não foi possível alterar a fixação da nota.",
  );
}

export async function excluirNota(id) {
  const resposta = await fetch(`${NOTAS_URL}/${id}`, {
    method: "DELETE",
    headers: criarHeaders(),
  });

  return processarResposta(
    resposta,
    "Não foi possível mover a nota para a lixeira.",
  );
}

export async function listarLixeira() {
  const resposta = await fetch(`${NOTAS_URL}/lixeira`, {
    headers: criarHeaders(),
  });

  return processarResposta(resposta, "Não foi possível carregar a lixeira.");
}

export async function restaurarNota(id) {
  const resposta = await fetch(`${NOTAS_URL}/${id}/restaurar`, {
    method: "PUT",
    headers: criarHeaders(),
  });

  return processarResposta(resposta, "Não foi possível restaurar a nota.");
}

export async function excluirNotaDefinitivamente(id) {
  const resposta = await fetch(`${NOTAS_URL}/${id}/definitivo`, {
    method: "DELETE",
    headers: criarHeaders(),
  });

  return processarResposta(
    resposta,
    "Não foi possível excluir a nota definitivamente.",
  );
}
