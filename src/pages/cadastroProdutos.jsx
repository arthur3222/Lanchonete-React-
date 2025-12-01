import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CadastroProdutos() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "Comidas",
    img: "",
    disponivel: true,
  });

  // Verificar autenticação
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
    
    setUserEmail(user.email);
  }, [navigate]);

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

    if (!formData.nome || !formData.preco || !formData.categoria) {
      setError("Preencha os campos obrigatórios (nome, preço, categoria)");
      return;
    }

    const preco = parseFloat(formData.preco);
    if (isNaN(preco) || preco <= 0) {
      setError("Preço deve ser um número válido maior que zero");
      return;
    }

    try {
      setLoading(true);
      
      const stored = localStorage.getItem('authUser');
      const user = stored ? JSON.parse(stored) : null;
      
      const { data: produtoData, error: insertError } = await supabase
        .from('produtos')
        .insert({
          nome: formData.nome,
          descricao: formData.descricao || null,
          preco: preco,
          categoria: formData.categoria,
          img: formData.img || null,
          disponivel: formData.disponivel,
          estabelecimento_id: null
        })
        .select()
        .single();

      if (insertError) throw new Error(insertError.message);

      // Registrar na auditoria
      if (user) {
        await supabase.from('auditoria').insert({
          usuario_id: user.id,
          acao: 'CREATE',
          tabela: 'produtos',
          registro_id: produtoData.id,
          dados_novos: produtoData
        });
      }

      setSuccess("Produto cadastrado com sucesso!");
      
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        categoria: "Comidas",
        img: "",
        disponivel: true,
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Header */}
      <div className="bg-blue-950/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Cadastrar Produto</h1>
            <p className="text-sm text-white/70 mt-1">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Navegação */}
        <div className="flex gap-3 mb-6">
          <Link
            to="/adminSesc"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition"
          >
            ← Voltar ao Painel
          </Link>
          <Link
            to="/listarProdutos"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition"
          >
            Ver Produtos
          </Link>
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

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          {/* Nome */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Nome do Produto *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Misto Quente"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
              disabled={loading}
            />
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva o produto..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition resize-none"
              disabled={loading}
            />
          </div>

          {/* Preço e Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Preço */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Preço (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                disabled={loading}
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Categoria *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
                disabled={loading}
              >
                <option value="Comidas">Comidas</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Sobremesas">Sobremesas</option>
              </select>
            </div>
          </div>

          {/* URL da Imagem */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              URL da Imagem
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg outline-none focus:border-white/50 transition"
              disabled={loading}
            />
            <p className="text-xs text-white/50 mt-1">
              Deixe em branco para usar imagem padrão
            </p>
          </div>

          {/* Disponível */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="disponivel"
                checked={formData.disponivel}
                onChange={handleChange}
                className="w-5 h-5 accent-orange-500"
                disabled={loading}
              />
              <span className="text-sm font-medium">Produto disponível</span>
            </label>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition"
          >
            {loading ? "CADASTRANDO..." : "CADASTRAR PRODUTO"}
          </button>
        </form>
      </div>
    </div>
  );
}
