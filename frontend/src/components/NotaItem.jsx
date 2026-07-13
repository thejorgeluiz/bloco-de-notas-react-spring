import { useState } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

function NotaItem({ nota, editarNota, removerNota, fixarNota }) {
  const [mostrarNota, setMostrarNota] = useState(false);

  const cores = [
    "bg-warning-subtle",
    "bg-primary-subtle",
    "bg-success-subtle",
    "bg-danger-subtle",
    "bg-info-subtle",
  ];

  const corNota = cores[(nota.id - 1) % cores.length];

  return (
    <>
      <Card
        className={`nota-card shadow-sm ${corNota} ${
          nota.fixada ? "border-warning border-2" : ""
        }`}
        onClick={() => setMostrarNota(true)}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              {nota.fixada && (
                <span className="badge text-bg-warning">📌 Fixada</span>
              )}
            </div>

            <div onClick={(evento) => evento.stopPropagation()}>
              <Dropdown align="end">
                <Dropdown.Toggle
                  size="sm"
                  className="menu-sem-seta botao-acoes"
                  aria-label="Ações da nota"
                >
                  ⋮
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => fixarNota(nota.id)}>
                    {nota.fixada ? "📌 Desafixar" : "📍 Fixar"}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => editarNota(nota.id, nota.texto)}
                  >
                    ✏️ Editar
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => removerNota(nota.id)}
                  >
                    🗑️ Mover para a lixeira
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <Card.Text className="nota-resumo mt-3 mb-0">
            {nota.texto}
          </Card.Text>
        </Card.Body>

        <Card.Footer className="bg-transparent datas-nota">
          <small className="text-muted d-block">
            Criada em {new Date(nota.dataCriacao).toLocaleString("pt-BR")}
          </small>

          {nota.dataAtualizacao && (
            <small className="text-muted d-block">
              Editada em{" "}
              {new Date(nota.dataAtualizacao).toLocaleString("pt-BR")}
            </small>
          )}
        </Card.Footer>
      </Card>

      <Modal
        show={mostrarNota}
        onHide={() => setMostrarNota(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {nota.fixada ? "📌 Nota fixada" : "📝 Nota"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="nota-completa">{nota.texto}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NotaItem;