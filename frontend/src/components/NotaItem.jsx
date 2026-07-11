function NotaItem({ nota, editarNota, removerNota }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div>{nota.texto}</div>

        <small className="text-muted">
          {new Date(nota.dataCriacao).toLocaleString("pt-BR")}
        </small>
      </div>

      <div>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => editarNota(nota.id, nota.texto)}
        >
          Editar
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => removerNota(nota.id)}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}

export default NotaItem;
