import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown, Navbar } from "react-bootstrap";

import { obterUsuarioLogado, sair } from "../services/api";

function BarraTopo() {
  const navigate = useNavigate();
  const usuario = obterUsuarioLogado();

  function sairDoSistema() {
    sair();
    navigate("/login", { replace: true });
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/">
          📝 Bloco de Notas
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          {usuario && (
            <Navbar.Text className="d-none d-sm-block">
              Olá, {usuario.nome}
            </Navbar.Text>
          )}

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
              {usuario && (
                <>
                  <Dropdown.Header>
                    <div>{usuario.nome}</div>
                    <small>{usuario.email}</small>
                  </Dropdown.Header>

                  <Dropdown.Divider />
                </>
              )}

              <Dropdown.Item as={Link} to="/">
                📝 Minhas notas
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/lixeira">
                🗑️ Excluídos
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item className="text-danger" onClick={sairDoSistema}>
                🚪 Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default BarraTopo;
