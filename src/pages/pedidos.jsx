import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Pedidos() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const paramUserId = params.get("userId") || "";

  const [viewer, setViewer] = useState({ id: "", role: "", email: "" });

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) {
      navigate("/", { replace: true });
      return;
    }
    const user = JSON.parse(stored);
    setViewer({ id: user.id, role: user.role, email: user.email || "" });
  }, [navigate]);

  const effectiveUserId = useMemo(() => {
    if (!viewer.role) return "";
    // Aluno só enxerga os próprios pedidos
    if (viewer.role === "aluno") return viewer.id;
    // Admin/Master pode usar filtro por userId (quando presente)
    return paramUserId || "";
  }, [viewer, paramUserId]);

  const loadOrders = async () => {
    if (!viewer.role) return;
    
    try {
      setLoading(true);
      
      let query = supabase
        .from("pedidos")
        .select(`
          *,
          usuarios:usuario_id (
            id,
            nome_completo,
            nome,
            email
          )
        `)
        .order("created_at", { ascending: false });
      
      if (effectiveUserId) {
        query = query.eq("usuario_id", effectiveUserId);
      }
      
      const { data, error } = await query;
      
      if (error) throw new Error(error.message);
      
      // Dados já vêm enriquecidos com JOIN
      setOrders(data || []);
      
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      alert("Erro ao carregar pedidos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!viewer.role) return; // aguarda carregar viewer
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewer, effectiveUserId]);

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pendente":
      case "novo":
        return "#ff9800";
      case "preparando":
        return "#03a9f4";
      case "pronto":
        return "#4caf50";
      case "cancelado":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  const shortId = (id) => (id ? String(id).slice(0, 8) + "..." : "");

  const isAdminLike = viewer.role === "admin" || viewer.role === "master";
  const showingFilter = Boolean(effectiveUserId) && isAdminLike;

  // Função para marcar como pronto e deletar
  const marcarComoPronto = async (pedido) => {
    if (!window.confirm(`Marcar pedido #${shortId(pedido.id)} como pronto e removê-lo?`)) return;
    
    try {
      setLoading(true);

      // Apaga o pedido do banco diretamente
      const { error: deleteError } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", pedido.id);
      
      if (deleteError) throw new Error(deleteError.message);

      alert("Pedido marcado como pronto e removido com sucesso!");
      loadOrders();
    } catch (err) {
      alert("Erro ao processar pedido: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função SIMPLIFICADA para apagar todos os pedidos - 100% FUNCIONAL
  const apagarTodosPedidos = async () => {
    const confirmacao = window.confirm(
      "⚠️ ATENÇÃO: Esta ação irá apagar TODOS os pedidos do sistema!\n\n" +
      "Esta ação é IRREVERSÍVEL.\n\n" +
      "Deseja realmente continuar?"
    );
    
    if (!confirmacao) return;

    const segundaConfirmacao = prompt(
      "Digite 'DELETAR' para confirmar a exclusão de todos os pedidos:"
    );
    
    if (segundaConfirmacao !== "DELETAR") {
      alert("Operação cancelada.");
      return;
    }

    try {
      setLoading(true);
      
      // Usar delete direto sem buscar IDs primeiro (mais eficiente)
      const { error, count } = await supabase
        .from("pedidos")
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Condição que sempre é true
      
      if (error) throw new Error(error.message);
      
      alert(`✅ Sucesso! Todos os pedidos foram apagados.`);
      await loadOrders();
      
    } catch (err) {
      console.error("❌ Erro ao apagar pedidos:", err);
      alert(`❌ Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Pedidos</h1>
        <div style={styles.subtitle}>
          {viewer.role === "aluno"
            ? "Seus pedidos"
            : showingFilter
            ? `Filtrado por usuário: ${shortId(effectiveUserId)}`
            : "Todos os pedidos"}
        </div>
        <div style={styles.viewerInfo}>
          {viewer.email} • {viewer.role}
        </div>
      </div>

      <div style={styles.toolbar}>
        <button style={styles.refreshButton} onClick={loadOrders}>
          <span style={styles.refreshButtonText}>🔄 Recarregar</span>
        </button>

        {showingFilter && (
          <button
            style={{ ...styles.clearFilterButton }}
            onClick={() => navigate("/pedidos", { replace: true })}
          >
            <span style={styles.clearFilterButtonText}>Limpar filtro</span>
          </button>
        )}

        {/* Botão para apagar todos os pedidos (apenas admin/master) */}
        {isAdminLike && (
          <button
            style={styles.deleteAllButton}
            onClick={apagarTodosPedidos}
            disabled={loading}
          >
            Apagar todos os pedidos
          </button>
        )}

        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <span style={styles.backButtonText}>Voltar</span>
        </button>
      </div>

      <div style={styles.content}>
        {loading ? (
          <div style={styles.loading}>Carregando pedidos...</div>
        ) : orders.length === 0 ? (
          <div style={styles.empty}>Nenhum pedido encontrado</div>
        ) : (
          orders.map((o) => (
            <div key={o.id} style={styles.card}>
              <div style={styles.rowTop}>
                <div style={styles.orderId}>#{shortId(o.id)}</div>
                <div
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(o.status),
                  }}
                >
                  <span style={styles.statusText}>{o.status || "—"}</span>
                </div>
                {/* Botão para admin/master mudar status para pronto */}
                {isAdminLike && o.status !== "cancelado" && (
                  <button
                    style={styles.prontoButton}
                    onClick={() => marcarComoPronto(o)}
                    disabled={loading}
                  >
                    Marcar como pronto
                  </button>
                )}
              </div>

              <div style={styles.row}>
                <div style={styles.label}>Cliente</div>
                <div style={styles.value}>
                  {o.usuario?.nome_completo || o.usuario?.nome || o.usuario?.email || o.user_name || "Cliente desconhecido"}
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.label}>Loja</div>
                <div style={styles.value}>{o.tipo_loja?.toUpperCase() || "—"}</div>
              </div>

              <div style={styles.row}>
                <div style={styles.label}>Criado em</div>
                <div style={styles.value}>
                  {o.created_at ? new Date(o.created_at).toLocaleString("pt-BR") : "—"}
                </div>
              </div>

              {o.items && Array.isArray(o.items) && (
                <div style={styles.itemsSection}>
                  <div style={styles.itemsLabel}>Itens:</div>
                  {o.items.map((item, idx) => (
                    <div key={idx} style={styles.itemRow}>
                      <span>{item.quantidade}x {item.nome}</span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={styles.row}>
                <div style={styles.labelTotal}>Total</div>
                <div style={styles.valueTotal}>
                  {typeof o.total === "number"
                    ? o.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    : "—"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: "system-ui" },
  header: { backgroundColor: "#9c27b0", padding: 24, textAlign: "center" },
  title: { margin: 0, fontSize: 26, fontWeight: 800, color: "#fff" },
  subtitle: { marginTop: 6, fontSize: 14, color: "#fff", opacity: 0.9 },
  viewerInfo: { marginTop: 4, fontSize: 12, color: "#fff", opacity: 0.85 },
  toolbar: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    padding: 12,
    maxWidth: 920,
    margin: "0 auto",
  },
  refreshButton: {
    backgroundColor: "#fff",
    border: "2px solid #9c27b0",
    borderRadius: 8,
    padding: "10px 12px",
    cursor: "pointer",
  },
  refreshButtonText: { color: "#000", fontWeight: 700 },
  clearFilterButton: {
    backgroundColor: "#fff",
    border: "2px solid #9c27b0",
    borderRadius: 8,
    padding: "10px 12px",
    cursor: "pointer",
  },
  clearFilterButtonText: { color: "#000", fontWeight: 700 },
  backButton: {
    marginLeft: "auto",
    backgroundColor: "#757575",
    border: "none",
    borderRadius: 8,
    padding: "10px 12px",
    cursor: "pointer",
  },
  backButtonText: { color: "#000", fontWeight: 700 },
  content: { padding: 12, maxWidth: 920, margin: "0 auto 24px" },
  loading: { textAlign: "center", color: "#757575", marginTop: 20 },
  empty: { textAlign: "center", color: "#757575", marginTop: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  rowTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  orderId: { fontWeight: 800, color: "#333" },
  statusBadge: { padding: "4px 10px", borderRadius: 999 },
  statusText: { color: "#fff", fontSize: 12, fontWeight: 800 },
  row: { display: "flex", justifyContent: "space-between", paddingTop: 6 },
  label: { color: "#666", fontSize: 12 },
  value: { color: "#000", fontSize: 14, fontWeight: 600 },
  itemsSection: {
    marginTop: 12,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  itemsLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#666",
    marginBottom: 6,
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    fontSize: 13,
    color: "#333",
    borderBottom: "1px solid #e0e0e0",
  },
  labelTotal: {
    color: "#333",
    fontSize: 14,
    fontWeight: 800,
  },
  valueTotal: {
    color: "#9c27b0",
    fontSize: 16,
    fontWeight: 800,
  },
  prontoButton: {
    marginLeft: 12,
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  deleteAllButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 700,
  },
};
