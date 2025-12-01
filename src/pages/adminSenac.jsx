import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSenac() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) {
      navigate("/senac/login", { replace: true });
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "admin" && user.role !== "master") {
      navigate("/senac/login", { replace: true });
      return;
    }

    setUserEmail(user.email || "");
    setIsMaster(user.role === "master");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Painel Administrativo</h1>
        <h2 style={styles.subtitle}>Senac</h2>
        <div style={styles.userEmail}>{userEmail}</div>
      </div>

      <div style={styles.content}>
        {isMaster && (
          <>
            <button
              style={{ ...styles.card, ...styles.masterCard, cursor: "pointer" }}
              onClick={() => navigate("/masterAdmin")}
            >
              <div style={styles.cardTitle}>⚙️ Gerenciar Usuários</div>
              <div style={styles.cardDescription}>
                Controle de permissões e usuários (Master Admin)
              </div>
            </button>

            <button
              style={{ ...styles.card, ...styles.masterCard, cursor: "pointer" }}
              onClick={() => navigate("/cadastroEstabelecimentos")}
            >
              <div style={styles.cardTitle}>🏢 Gerenciar Estabelecimentos</div>
              <div style={styles.cardDescription}>
                Cadastrar e gerenciar escolas e lanchonetes (Master Admin)
              </div>
            </button>
          </>
        )}

        <button
          style={{ ...styles.card, cursor: "pointer" }}
          onClick={() => navigate("/cadastroProdutos")}
        >
          <div style={styles.cardTitle}>➕ Cadastrar Produtos</div>
          <div style={styles.cardDescription}>
            Adicionar novos produtos ao cardápio
          </div>
        </button>

        <button
          style={{ ...styles.card, cursor: "pointer" }}
          onClick={() => navigate("/listarProdutos")}
        >
          <div style={styles.cardTitle}>📋 Gerenciar Produtos</div>
          <div style={styles.cardDescription}>
            Visualizar, editar ou remover produtos
          </div>
        </button>

        <button style={{ ...styles.card, cursor: "pointer" }}>
          <div style={styles.cardTitle}>📦 Pedidos</div>
          <div style={styles.cardDescription}>Visualizar e gerenciar pedidos</div>
        </button>

        <button
          style={{ ...styles.card, ...styles.userCard, cursor: "pointer" }}
          onClick={() => navigate("/lojasenac")}
        >
          <div style={styles.cardTitle}>👤 Área do Aluno</div>
          <div style={styles.cardDescription}>Acessar área de pedidos</div>
        </button>

        <button
          style={{ ...styles.logoutButton, cursor: "pointer" }}
          onClick={handleLogout}
        >
          <span style={styles.logoutText}>Sair</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },
  header: {
    backgroundColor: "#FF7700",
    padding: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    margin: 0,
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  content: {
    padding: 20,
    maxWidth: 920,
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "none",
    textAlign: "left",
    width: "100%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#004586",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  userCard: {
    backgroundColor: "#004586",
    color: "#fff",
  },
  masterCard: {
    backgroundColor: "#9c27b0",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 10,
    display: "block",
    width: "100%",
    border: "none",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
  },
};
