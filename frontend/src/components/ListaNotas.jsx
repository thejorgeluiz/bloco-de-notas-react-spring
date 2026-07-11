import NotaItem from "./NotaItem";

function ListaNotas({ notas, editarNota, removerNota }) {
  return (
    <>
      <h3>Notas</h3>

      <ul className="list-group mt-3">
        {notas.map((nota) => (
          <NotaItem
            key={nota.id}
            nota={nota}
            editarNota={editarNota}
            removerNota={removerNota}
          />
        ))}
      </ul>
    </>
  );
}

export default ListaNotas;