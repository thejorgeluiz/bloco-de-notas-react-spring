import Dropdown from "react-bootstrap/Dropdown";

function NotaItem({ nota, editarNota, removerNota, fixarNota }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div>{nota.texto}</div>

        <small className="text-muted">
          {new Date(nota.dataCriacao).toLocaleString("pt-BR")}
        </small>
      </div>

      <Dropdown align="end">
        <Dropdown.Toggle variant="light" size="sm" aria-label="Ações da nota">
          ⋮
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => fixarNota(nota.id)}>
            {nota.fixada ? "📌 Desafixar" : "📍 Fixar"}
          </Dropdown.Item>

          <Dropdown.Item onClick={() => editarNota(nota.id, nota.texto)}>
            ✏️ Editar
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item
            className="text-danger"
            onClick={() => removerNota(nota.id)}
          >
            🗑️ Excluir
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}

export default NotaItem;
