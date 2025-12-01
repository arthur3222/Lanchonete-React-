import React, { useState, useEffect } from "react";
import { Menu, RefreshCw, CheckCircle, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { supabase } from "../supabaseClient";

export default function PedidosAdmin() {
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const menuItems = [
    { label: "home", path: "/" },
    { label: "Pedidos", path: "/pedidos-admin" },
    { label: "Gerenciar Produtos", path: "/gerenciar" },
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem("authUser");
      const user = stored ? JSON.parse(stored) : null;
      setUserRole(user?.role || null);
      
      if (user?.role !== "adm" && user?.role !== "adm_master") {
        window.location.href = "/";
      }
    } catch {
      window.location.href = "/";
    }
  }, []);

  const carregarPedidos = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: false });

      if (filtroStatus !== "todos") {
        query = query.eq("status", filtroStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPedidos(data || []);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      alert("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, [filtroStatus]);

  const atualizarStatus = async (pedidoId, novoStatus) => {
    const mensagens = {
      em_preparo: "Iniciar preparo deste pedido?",
      pronto: "Marcar pedido como pronto? O cliente receberá uma notificação.",
      entregue: "Confirmar entrega do pedido?",
      cancelado: "Cancelar este pedido? Esta ação notificará o cliente.",
    };

    if (!window.confirm(mensagens[novoStatus] || "Atualizar status do pedido?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("pedidos")
        .update({ 
          status: novoStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", pedidoId);

      if (error) throw error;
      
      alert("✅ Status atualizado! O cliente foi notificado.");
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("❌ Erro ao atualizar status: " + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente": return "bg-yellow-500/20 text-yellow-400";
      case "em_preparo": return "bg-blue-500/20 text-blue-400";
      case "pronto": return "bg-green-500/20 text-green-400";
      case "entregue": return "bg-gray-500/20 text-gray-400";
      default: return "bg-white/20 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pendente": return <Clock size={16} />;
      case "em_preparo": return <Package size={16} />;
      case "pronto": return <CheckCircle size={16} />;
      case "entregue": return <CheckCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#00529B] flex flex-col px-8 py-6 relative">
      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="Menu Admin"
        items={menuItems}
        accent="bg-orange-500"
        role={userRole}
      />
      
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 left-4 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
      >
        <Menu size={32} className="text-white" />
      </button>

      <div className="max-w-6xl mx-auto w-full mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gerenciar Pedidos</h1>
          <button
            onClick={carregarPedidos}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
          >
            <RefreshCw size={20} />
            Atualizar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
          {["todos", "pendente", "em_preparo", "pronto", "entregue"].map((status) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filtroStatus === status
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {status === "todos" ? "Todos" : status.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Lista de Pedidos */}
        {loading ? (
          <p className="text-white text-center py-12">Carregando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p className="text-white/70 text-center py-12">Nenhum pedido encontrado</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">{pedido.user_name}</h3>
                    <p className="text-white/70 text-sm">
                      {new Date(pedido.created_at).toLocaleString("pt-BR")}
                    </p>
                    <p className="text-white/70 text-sm">Loja: {pedido.tipo_loja.toUpperCase()}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(pedido.status)}`}>
                    {getStatusIcon(pedido.status)}
                    <span className="text-sm font-semibold">{pedido.status.replace("_", " ")}</span>
                  </div>
                </div>

                {/* Items do Pedido */}
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  {pedido.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-white/90 py-2 border-b border-white/10 last:border-0">
                      <span>{item.quantidade}x {item.nome}</span>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-white font-bold mt-3 pt-3 border-t border-white/20">
                    <span>Total:</span>
                    <span className="text-orange-400">R$ {parseFloat(pedido.total).toFixed(2)}</span>
                  </div>
                </div>

                {/* Ações Melhoradas */}
                <div className="flex flex-wrap gap-2">
                  {pedido.status === "pendente" && (
                    <>
                      <button
                        onClick={() => atualizarStatus(pedido.id, "pronto")}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-bold text-lg shadow-lg"
                      >
                        ✅ MARCAR COMO PRONTO
                      </button>
                      <button
                        onClick={() => atualizarStatus(pedido.id, "em_preparo")}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                      >
                        🔵 Iniciar Preparo
                      </button>
                      <button
                        onClick={() => atualizarStatus(pedido.id, "cancelado")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      >
                        ❌ Cancelar
                      </button>
                    </>
                  )}
                  {pedido.status === "em_preparo" && (
                    <>
                      <button
                        onClick={() => atualizarStatus(pedido.id, "pronto")}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-bold text-lg shadow-lg"
                      >
                        ✅ MARCAR COMO PRONTO
                      </button>
                      <button
                        onClick={() => atualizarStatus(pedido.id, "cancelado")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      >
                        ❌ Cancelar
                      </button>
                    </>
                  )}
                  {pedido.status === "pronto" && (
                    <button
                      onClick={() => atualizarStatus(pedido.id, "entregue")}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-semibold"
                    >
                      📦 Marcar como Entregue
                    </button>
                  )}
                  {pedido.status === "entregue" && (
                    <span className="px-4 py-2 bg-gray-500/30 text-gray-300 rounded-lg">
                      ✓ Pedido Concluído
                    </span>
                  )}
                  {pedido.status === "cancelado" && (
                    <span className="px-4 py-2 bg-red-500/30 text-red-300 rounded-lg">
                      ✗ Pedido Cancelado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/"
        className="fixed bottom-8 left-10 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
      >
        voltar
      </Link>
    </div>
  );
}
