import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function MasterAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) {
      navigate("/", { replace: true });
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "master") {
      navigate("/", { replace: true });
      return;
    }

    setUserEmail(user.email);
    setCurrentUserId(user.id);
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      setUsers(data);
    } catch (err) {
      alert("Erro ao carregar usuários: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (user) => {
    const novaRole = user.role === "aluno" ? "admin" : "aluno";
    const confirma = window.confirm(
      `Alterar ${user.email} de "${user.role}" para "${novaRole}"?`
    );
    if (!confirma) return;

    try {
      const stored = localStorage.getItem('authUser');
      const adminUser = stored ? JSON.parse(stored) : null;

      const { error } = await supabase
        .from("usuarios")
        .update({ role: novaRole, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) throw new Error(error.message);

      if (adminUser) {
        await supabase.from('auditoria').insert({
          usuario_id: adminUser.id,
          acao: 'UPDATE_ROLE',
          tabela: 'usuarios',
          registro_id: user.id,
          dados_anteriores: { role: user.role, email: user.email },
          dados_novos: { role: novaRole, email: user.email }
        });
      }

      alert("Role alterada com sucesso!");
      loadUsers();
    } catch (err) {
      alert("Erro ao alterar role: " + err.message);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case "master":
        return "#9c27b0";
      case "admin":
        return "#ff9800";
      case "aluno":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "master":
        return "Admin Master";
      case "admin":
        return "Administrador";
      case "aluno":
        return "Aluno";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gerenciar Usuários</h1>
        <h2 style={styles.subtitle}>Admin Master</h2>
        <div style={styles.userEmail}>{userEmail}</div>
        {currentUserId && (
          <div style={styles.userId}>
            ID: {String(currentUserId).substring(0, 8)}...
          </div>
        )}
      </div>

      <div style={styles.searchContainer}>
        <input
          style={styles.searchInput}
          placeholder="Buscar por email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          style={styles.refreshButton}
          onClick={loadUsers}
        >
          🔄 Recarregar
        </button>
        <button
          style={styles.pedidosNavButton}
          onClick={() => navigate("/pedidos")}
        >
          🧾 Pedidos
        </button>
      </div>

      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingText}>Carregando usuários...</div>
        ) : filteredUsers.length === 0 ? (
          <div>
            <div style={styles.emptyText}>Nenhum usuário encontrado</div>
            <div style={styles.hintText}>Total: {users.length}</div>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} style={styles.userCard}>
              <div style={styles.userInfo}>
                <div style={styles.userEmailCard}>{user.email}</div>
                {user.email.toLowerCase() === userEmail.toLowerCase() && (
                  <div style={styles.currentUserBadge}>👤 Você</div>
                )}
                <div
                  style={{
                    ...styles.roleBadge,
                    backgroundColor: getRoleColor(user.role),
                  }}
                >
                  <div style={styles.roleText}>{getRoleLabel(user.role)}</div>
                </div>
              </div>

              <div style={styles.userActions}>
                <button
                  style={styles.viewOrdersButton}
                  onClick={() => navigate(`/pedidos?userId=${encodeURIComponent(user.id)}`)}
                  title="Ver pedidos deste usuário"
                >
                  <div style={styles.viewOrdersButtonText}>Ver Pedidos</div>
                </button>

                {user.role !== "master" &&
                  user.email.toLowerCase() !== userEmail.toLowerCase() && (
                    <button
                      style={{
                        ...styles.changeButton,
                        borderColor: getRoleColor(
                          user.role === "aluno" ? "admin" : "aluno"
                        ),
                      }}
                      onClick={() => handleChangeRole(user)}
                    >
                      <div style={styles.changeButtonText}>
                        {user.role === "aluno" ? "Tornar Admin" : "Tornar Aluno"}
                      </div>
                    </button>
                  )}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={styles.footer}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <div style={styles.backButtonText}>Voltar</div>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui",
  },
  header: {
    backgroundColor: "#9c27b0",
    padding: 30,
    paddingTop: 50,
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
    fontSize: 18,
    color: "#fff",
    margin: 0,
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  userId: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
    marginTop: 5,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
    display: "flex",
    gap: 10,
    maxWidth: 920,
    margin: "0 auto",
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    border: "1px solid #e0e0e0",
    flex: 1,
  },
  refreshButton: {
    backgroundColor: "#9c27b0",
    padding: "10px 12px",
    borderRadius: 8,
    color: "#000", // texto preto
    border: "none",
    cursor: "pointer",
  },
  pedidosNavButton: {
    backgroundColor: "#ffffff",
    padding: "10px 12px",
    borderRadius: 8,
    color: "#000",
    border: "2px solid #9c27b0",
    cursor: "pointer",
  },
  content: {
    padding: 15,
    maxWidth: 920,
    margin: "0 auto",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#757575",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#757575",
    marginTop: 20,
  },
  hintText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    marginTop: 10,
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    marginBottom: 0,
  },
  userEmailCard: {
    fontSize: 16,
    fontWeight: 700,
    color: "#333",
  },
  currentUserBadge: {
    fontSize: 12,
    color: "#9c27b0",
    fontWeight: 700,
    marginTop: 4,
  },
  roleBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 15,
    marginTop: 8,
  },
  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },
  userActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  viewOrdersButton: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#9c27b0",
    borderRadius: 8,
    padding: 12,
    background: "transparent",
    cursor: "pointer",
  },
  viewOrdersButtonText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#000",
  },
  changeButton: {
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 8,
    padding: 12,
    background: "transparent",
    cursor: "pointer",
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#000", // texto preto
  },
  footer: {
    padding: 15,
    backgroundColor: "#fff",
    maxWidth: 920,
    margin: "0 auto 30px",
  },
  backButton: {
    backgroundColor: "#757575",
    padding: 15,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  backButtonText: {
    color: "#000", // texto preto
    fontSize: 16,
    fontWeight: 700,
  },
};
