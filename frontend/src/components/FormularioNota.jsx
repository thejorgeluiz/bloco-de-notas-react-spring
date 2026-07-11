function FormularioNota({
  texto,
  setTexto,
  salvarNota,
  idEditando,
  cancelarEdicao,
}) {
  return (
    <>
      <textarea
        className="form-control"
        rows="5"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite sua nota"
      />

      <button className="btn btn-primary mt-3" onClick={salvarNota}>
        {idEditando !== null ? "Atualizar" : "Salvar"}
      </button>

      {idEditando !== null && (
        <button
          className="btn btn-secondary mt-3 ms-2"
          onClick={cancelarEdicao}
        >
          Cancelar
        </button>
      )}
    </>
  );
}

export default FormularioNota;
