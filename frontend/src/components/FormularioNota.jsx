function FormularioNota({
  texto,
  setTexto,
  salvarNota,
  idEditando,
  cancelarEdicao,
  salvando,
}) {
  return (
    <>
      <textarea
        className="form-control"
        rows="5"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Digite sua nota"
        disabled={salvando}
      />

      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={salvarNota}
        disabled={salvando}
      >
        {salvando ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            />

            {idEditando !== null ? "Atualizando..." : "Salvando..."}
          </>
        ) : idEditando !== null ? (
          "Atualizar"
        ) : (
          "Salvar"
        )}
      </button>

      {idEditando !== null && (
        <button
          type="button"
          className="btn btn-secondary mt-3 ms-2"
          onClick={cancelarEdicao}
          disabled={salvando}
        >
          Cancelar
        </button>
      )}
    </>
  );
}

export default FormularioNota;
