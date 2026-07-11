import NotaItem from "./NotaItem";

function ListaNotas({ notas, editarNota, removerNota, fixarNota }) {
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
            fixarNota={fixarNota}
          />
        ))}
      </ul>
    </>
  );
}

export default ListaNotas;