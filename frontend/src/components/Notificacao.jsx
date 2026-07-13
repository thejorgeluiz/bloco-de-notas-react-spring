import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Notificacao({ mostrar, mensagem, tipo = "success", aoFechar }) {
  return (
    <ToastContainer
      className="p-3"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 2000,
        maxWidth: "calc(100vw - 2rem)",
      }}
    >
      <Toast show={mostrar} onClose={aoFechar} bg={tipo} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Bloco de Notas</strong>
        </Toast.Header>

        <Toast.Body className={tipo === "warning" ? "text-dark" : "text-white"}>
          {mensagem}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notificacao;
