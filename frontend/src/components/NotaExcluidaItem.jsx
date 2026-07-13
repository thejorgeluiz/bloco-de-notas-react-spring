import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function NotaExcluidaItem({
  nota,
  restaurar,
  excluirDefinitivamente,
}) {
  const [mostrarNota, setMostrarNota] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm bg-light">
        <Card.Body>
          <Card.Text className="nota-excluida-resumo">
            {nota.texto}
          </Card.Text>
        </Card.Body>

        <Card.Footer className="bg-transparent">
          <small className="text-muted d-block mb-3">
            Excluída em{" "}
            {new Date(nota.dataExclusao).toLocaleString(
              "pt-BR",
            )}
          </small>

          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => setMostrarNota(true)}
            >
              Ver nota
            </button>

            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => restaurar(nota.id)}
            >
              Restaurar
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() =>
                excluirDefinitivamente(nota.id)
              }
            >
              Excluir
            </button>
          </div>
        </Card.Footer>
      </Card>

      <Modal
        show={mostrarNota}
        onHide={() => setMostrarNota(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>🗑️ Nota excluída</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="nota-completa">{nota.texto}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NotaExcluidaItem;