import { Link } from "react-router-dom";
import { Container, Dropdown, Navbar } from "react-bootstrap";

function BarraTopo() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/">
          📝 Bloco de Notas
        </Navbar.Brand>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="outline-light"
            id="menu-principal"
            className="menu-sem-seta"
            aria-label="Abrir menu"
          >
            ☰
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/">
              📝 Minhas notas
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/lixeira">
              🗑️ Excluídos
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default BarraTopo;