import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ListarProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (!stored) {
      navigate("/sesc/login", { replace: true });
      return;
    }
    
    const user = JSON.parse(stored);
    if (user.role !== 'admin' && user.role !== 'master') {
      navigate("/", { replace: true });
      return;
    }

    loadProdutos();
  }, [navigate]);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      setProdutos(data || []);
    } catch (err) {
      alert("Erro ao carregar produtos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nome) => {
    if (!window.confirm(`Deseja realmente excluir "${nome}"?`)) return;

    try {
      const stored = localStorage.getItem('authUser');
      const user = stored ? JSON.parse(stored) : null;

      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
      
      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'DELETE',
          tabela: 'produtos',
          registro_id: id,
          dados_anteriores: { nome }
        });
      }
      
      alert("Produto excluído com sucesso!");
      loadProdutos();
    } catch (err) {
      alert("Erro ao excluir: " + err.message);
    }
  };

  const toggleDisponivel = async (produto) => {
    try {
      const stored = localStorage.getItem('authUser');
      const user = stored ? JSON.parse(stored) : null;

      const novoStatus = !produto.disponivel;
      
      const { error } = await supabase
        .from('produtos')
        .update({ disponivel: novoStatus })
        .eq('id', produto.id);

      if (error) throw new Error(error.message);
      
      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'UPDATE',
          tabela: 'produtos',
          registro_id: produto.id,
          dados_anteriores: { disponivel: produto.disponivel, nome: produto.nome },
          dados_novos: { disponivel: novoStatus, nome: produto.nome }
        });
      }
      
      loadProdutos();
    } catch (err) {
      alert("Erro ao atualizar: " + err.message);
    }
  };

  const produtosFiltrados = filter === "Todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="bg-blue-950/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Produtos Cadastrados</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-6 flex-wrap">
          <Link
            to="/cadastroProdutos"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
          >
            + Novo Produto
          </Link>
          <Link
            to="/adminSesc"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            ← Voltar
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {["Todos", "Comidas", "Bebidas", "Sobremesas"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                {produto.img && (
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-2">{produto.nome}</h3>
                <p className="text-sm text-white/70 mb-2 line-clamp-2">
                  {produto.descricao || "Sem descrição"}
                </p>
                <p className="text-orange-400 font-bold text-lg mb-3">
                  R$ {parseFloat(produto.preco).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">
                    {produto.categoria}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      produto.disponivel
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {produto.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleDisponivel(produto)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                  >
                    {produto.disponivel ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id, produto.nome)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
