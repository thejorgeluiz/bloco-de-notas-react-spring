import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ServidorDisponivel({ children }) {
  const [status, setStatus] = useState("verificando");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function verificarServidor() {
      setStatus("verificando");

      try {
        const resposta = await fetch(`${API_URL}/health`, {
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error();
        }

        setStatus("online");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus("erro");
        }
      }
    }

    verificarServidor();

    return () => controller.abort();
  }, [tentativa]);

  if (status === "online") {
    return children;
  }

  return (
    <main className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div
        className="card shadow-sm text-center w-100"
        style={{ maxWidth: "460px" }}
      >
        <div className="card-body p-4 p-md-5">
          {status === "verificando" ? (
            <>
              <div
                className="spinner-border text-primary mb-4"
                role="status"
                aria-label="Carregando"
              />

              <h1 className="h4">Preparando o servidor...</h1>

              <p className="text-muted mb-0">
                Como esta demonstração utiliza hospedagem gratuita, o primeiro
                acesso pode levar até um minuto.
              </p>
            </>
          ) : (
            <>
              <div className="fs-1 mb-3">⚠️</div>

              <h1 className="h4">Não foi possível iniciar o servidor</h1>

              <p className="text-muted">
                Verifique sua conexão e tente novamente.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setTentativa((valorAtual) => valorAtual + 1)}
              >
                Tentar novamente
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default ServidorDisponivel;
