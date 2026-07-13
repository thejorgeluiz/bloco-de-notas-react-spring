import NotaItem from "./NotaItem";

function ListaNotas({ notas, editarNota, removerNota, fixarNota }) {
  return (
    <section className="mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Notas</h2>

        <span className="badge text-bg-secondary">
          {notas.length} {notas.length === 1 ? "nota" : "notas"}
        </span>
      </div>

      {notas.length === 0 ? (
        <div className="alert alert-secondary text-center mt-3">
          Nenhuma nota encontrada.
        </div>
      ) : (
        <div className="row g-3 mt-1">
          {notas.map((nota) => (
            <div className="col-12 col-md-6 col-lg-4" key={nota.id}>
              <NotaItem
                nota={nota}
                editarNota={editarNota}
                removerNota={removerNota}
                fixarNota={fixarNota}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListaNotas;
