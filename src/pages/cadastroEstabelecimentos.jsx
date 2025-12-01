import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CadastroEstabelecimentos() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("cadastro");
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "escola",
    endereco: "",
    telefone: "",
    email: "",
    cnpj: "",
    responsavel: "",
    ativo: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (!stored) {
      navigate("/sesc/login", { replace: true });
      return;
    }
    
    const user = JSON.parse(stored);
    if (user.role !== 'master') {
      navigate("/", { replace: true });
      return;
    }
    
    setUserEmail(user.email);
    loadEstabelecimentos();
  }, [navigate]);

  const loadEstabelecimentos = async () => {
    try {
      const { data, error } = await supabase
        .from('estabelecimentos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      setEstabelecimentos(data || []);
    } catch (err) {
      console.error("Erro ao carregar:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.nome || !formData.tipo) {
      setError("Preencha os campos obrigatórios (nome e tipo)");
      return;
    }

    try {
      setLoading(true);
      
      const stored = localStorage.getItem('authUser');
      const user = stored ? JSON.parse(stored) : null;
      
      const { data: estabData, error: insertError } = await supabase
        .from('estabelecimentos')
        .insert({
          nome: formData.nome,
          tipo: formData.tipo,
          endereco: formData.endereco || null,
          telefone: formData.telefone || null,
          email: formData.email || null,
          cnpj: formData.cnpj || null,
          responsavel: formData.responsavel || null,
          ativo: formData.ativo,
        })
        .select()
        .single();

      if (insertError) throw new Error(insertError.message);

      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'CREATE',
          tabela: 'estabelecimentos',
          registro_id: estabData.id,
          dados_novos: estabData
        });
      }

      setSuccess(`${formData.tipo === 'escola' ? 'Escola' : 'Lanchonete'} cadastrada com sucesso!`);
      
      setFormData({
        nome: "",
        tipo: "escola",
        endereco: "",
        telefone: "",
        email: "",
        cnpj: "",
        responsavel: "",
        ativo: true,
      });

      loadEstabelecimentos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Erro ao cadastrar estabelecimento");
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
        .from('estabelecimentos')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
      
      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'DELETE',
          tabela: 'estabelecimentos',
          registro_id: id,
          dados_anteriores: { nome }
        });
      }
      
      setSuccess("Estabelecimento excluído com sucesso!");
      loadEstabelecimentos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erro ao excluir: " + err.message);
    }
  };

  const toggleAtivo = async (item) => {
    try {
      const stored = localStorage.getItem('authUser');
      const user = stored ? JSON.parse(stored) : null;

      const novoStatus = !item.ativo;
      
      const { error } = await supabase
        .from('estabelecimentos')
        .update({ ativo: novoStatus })
        .eq('id', item.id);

      if (error) throw new Error(error.message);
      
      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'UPDATE',
          tabela: 'estabelecimentos',
          registro_id: item.id,
          dados_anteriores: { ativo: item.ativo },
          dados_novos: { ativo: novoStatus }
        });
      }
      
      loadEstabelecimentos();
    } catch (err) {
      setError("Erro ao atualizar: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/", { replace: true });
  };

  const escolas = estabelecimentos.filter(e => e.tipo === 'escola');
  const lanchonetes = estabelecimentos.filter(e => e.tipo === 'lanchonete');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      {/* Header */}
      <div className="bg-purple-950/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gerenciar Estabelecimentos</h1>
            <p className="text-sm text-white/70 mt-1">Master Admin - {userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Navegação */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3 mb-6">
          <Link
            to="/adminSesc"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition"
          >
            ← Voltar ao Painel
          </Link>
          <Link
            to="/masterAdmin"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition"
          >
            Gerenciar Usuários
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("cadastro")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "cadastro"
                ? "bg-purple-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            📝 Cadastrar
          </button>
          <button
            onClick={() => setActiveTab("escolas")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "escolas"
                ? "bg-purple-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            🏫 Escolas ({escolas.length})
          </button>
          <button
            onClick={() => setActiveTab("lanchonetes")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "lanchonetes"
                ? "bg-purple-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            🍔 Lanchonetes ({lanchonetes.length})
          </button>
        </div>

        {/* Mensagens */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            {success}
          </div>
        )}

        {/* Conteúdo das Tabs */}
        {activeTab === "cadastro" && (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-3xl">
            {/* Tipo */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Tipo de Estabelecimento *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                disabled={loading}
              >
                <option value="escola">🏫 Escola</option>
                <option value="lanchonete">🍔 Lanchonete</option>
              </select>
            </div>

            {/* Nome */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Nome do Estabelecimento *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder={formData.tipo === 'escola' ? 'Ex: SESC Curitiba' : 'Ex: Lanchonete Central'}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                disabled={loading}
              />
            </div>

            {/* Endereço e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email e CNPJ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@exemplo.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  CNPJ
                </label>
                <input
                  type="text"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  placeholder="00.000.000/0000-00"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Responsável */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Responsável
              </label>
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                disabled={loading}
              />
            </div>

            {/* Ativo */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="ativo"
                  checked={formData.ativo}
                  onChange={handleChange}
                  className="w-5 h-5 accent-purple-500"
                  disabled={loading}
                />
                <span className="text-sm font-medium">Estabelecimento ativo</span>
              </label>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition"
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR ESTABELECIMENTO"}
            </button>
          </form>
        )}

        {/* Lista de Escolas */}
        {activeTab === "escolas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escolas.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/50">
                Nenhuma escola cadastrada
              </div>
            ) : (
              escolas.map((item) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">🏫</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.ativo ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {item.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.nome}</h3>
                  {item.endereco && <p className="text-sm text-white/70 mb-2">📍 {item.endereco}</p>}
                  {item.telefone && <p className="text-sm text-white/70 mb-2">📞 {item.telefone}</p>}
                  {item.email && <p className="text-sm text-white/70 mb-2">✉️ {item.email}</p>}
                  {item.responsavel && <p className="text-sm text-white/70 mb-4">👤 {item.responsavel}</p>}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleAtivo(item)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                    >
                      {item.ativo ? "Desativar" : "Ativar"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.nome)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Lista de Lanchonetes */}
        {activeTab === "lanchonetes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lanchonetes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/50">
                Nenhuma lanchonete cadastrada
              </div>
            ) : (
              lanchonetes.map((item) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">🍔</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.ativo ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {item.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.nome}</h3>
                  {item.endereco && <p className="text-sm text-white/70 mb-2">📍 {item.endereco}</p>}
                  {item.telefone && <p className="text-sm text-white/70 mb-2">📞 {item.telefone}</p>}
                  {item.email && <p className="text-sm text-white/70 mb-2">✉️ {item.email}</p>}
                  {item.responsavel && <p className="text-sm text-white/70 mb-4">👤 {item.responsavel}</p>}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleAtivo(item)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                    >
                      {item.ativo ? "Desativar" : "Ativar"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.nome)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
