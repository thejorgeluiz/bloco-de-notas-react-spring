const CHAVE_NOTAS = "bloco-notas:notas-locais";

function carregarTodas() {
  const dadosSalvos = localStorage.getItem(CHAVE_NOTAS);

  if (!dadosSalvos) {
    return [];
  }

  try {
    return JSON.parse(dadosSalvos);
  } catch {
    return [];
  }
}

function salvarTodas(notas) {
  localStorage.setItem(CHAVE_NOTAS, JSON.stringify(notas));
}

export function listarNotasLocais() {
  return carregarTodas().filter((nota) => !nota.excluida);
}

export function criarNotaLocal(texto) {
  const notas = carregarTodas();
  const agora = new Date().toISOString();

  const novaNota = {
    id: Date.now(),
    texto,
    fixada: false,
    excluida: false,
    dataCriacao: agora,
    dataAtualizacao: agora,
    dataExclusao: null,
  };

  salvarTodas([...notas, novaNota]);

  return novaNota;
}

export function atualizarNotaLocal(id, texto) {
  const agora = new Date().toISOString();

  const notasAtualizadas = carregarTodas().map((nota) =>
    nota.id === id
      ? {
          ...nota,
          texto,
          dataAtualizacao: agora,
        }
      : nota,
  );

  salvarTodas(notasAtualizadas);
}

export function alternarFixacaoLocal(id) {
  const notasAtualizadas = carregarTodas().map((nota) =>
    nota.id === id
      ? {
          ...nota,
          fixada: !nota.fixada,
        }
      : nota,
  );

  salvarTodas(notasAtualizadas);
}

export function excluirNotaLocal(id) {
  const agora = new Date().toISOString();

  const notasAtualizadas = carregarTodas().map((nota) =>
    nota.id === id
      ? {
          ...nota,
          excluida: true,
          dataExclusao: agora,
        }
      : nota,
  );

  salvarTodas(notasAtualizadas);
}

export function listarLixeiraLocal() {
  return carregarTodas()
    .filter((nota) => nota.excluida)
    .sort(
      (a, b) =>
        new Date(b.dataExclusao).getTime() - new Date(a.dataExclusao).getTime(),
    );
}

export function restaurarNotaLocal(id) {
  const notasAtualizadas = carregarTodas().map((nota) =>
    nota.id === id
      ? {
          ...nota,
          excluida: false,
          dataExclusao: null,
          dataAtualizacao: new Date().toISOString(),
        }
      : nota,
  );

  salvarTodas(notasAtualizadas);
}

export function excluirNotaLocalDefinitivamente(id) {
  const notasAtualizadas = carregarTodas().filter((nota) => nota.id !== id);

  salvarTodas(notasAtualizadas);
}
