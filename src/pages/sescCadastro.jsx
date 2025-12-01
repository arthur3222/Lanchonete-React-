import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MaskedInput from "../components/MaskedInput";
import { supabase } from "../supabaseClient";

function SescLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 120 60" className={className}>
      <path
        d="M10 18 C 38 -2, 82 -2, 110 18"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="60"
        y="45"
        textAnchor="middle"
        fontWeight="900"
        fontSize="32"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="currentColor"
      >
        sesc
      </text>
    </svg>
  );
}

export default function SescCadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_completo: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nome_completo || !formData.email || !formData.senha) {
      setError("Preencha os campos obrigatórios (nome, email, senha)");
      return;
    }

    if (formData.senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      // Determinar role pelo email
      let userRole = 'aluno';
      if (formData.email.endsWith('@admMaster.com')) userRole = 'master';
      else if (formData.email.endsWith('@adm.com')) userRole = 'admin';

      // 1. Verificar se email já existe
      const { data: existingUser } = await supabase
        .from('usuarios')
        .select('email')
        .eq('email', formData.email)
        .single();
      if (existingUser) {
        setError("Este email já está cadastrado. Faça login ou use outro email.");
        return;
      }

      // 2. Criar no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          emailRedirectTo: window.location.origin,
          data: { nome_completo: formData.nome_completo, role: userRole }
        }
      });
      if (authError) {
        if (authError.message.includes('already registered')) throw new Error("Email já cadastrado. Faça login.");
        throw new Error(authError.message);
      }
      if (!authData?.user) throw new Error("Erro ao criar usuário");

      // 3. Inserir na usuarios
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert({
          id: authData.user.id,
          email: formData.email,
          nome_completo: formData.nome_completo,
          cpf: formData.cpf || null,
          telefone: formData.telefone || null,
          role: userRole
        });
      if (insertError) throw new Error(insertError.message);

      // 4. Se já logado, montar userData sem SELECT
      if (authData.session) {
        const userData = {
          id: authData.user.id,
          email: formData.email,
          nome_completo: formData.nome_completo,
          cpf: formData.cpf || null,
          telefone: formData.telefone || null,
          role: userRole
        };
        localStorage.setItem('authUser', JSON.stringify({
          ...userData,
          token: authData.session.access_token
        }));

        const { error: auditError } = await supabase.from('auditoria').insert({
          usuario_id: userData.id,
          acao: 'CADASTRO',
          tabela: 'usuarios',
          registro_id: userData.id,
          dados_novos: { email: userData.email, nome: userData.nome_completo, role: userData.role }
        });
        if (auditError) console.error("Erro auditoria:", auditError.message);

        navigate(userRole === 'admin' || userRole === 'master' ? "/adminSesc" : "/lojasesc");
      } else {
        setError("✅ Cadastro realizado! Verifique seu email para confirmar a conta.");
        setTimeout(() => navigate("/sesc/login"), 3000);
      }
    } catch (err) {
      setError(err.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B4A80] text-white overflow-hidden pb-24 md:pb-32">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-14 px-4">
        {/* Logo (maior) */}
        <div className="w-64 h-64 rounded-full border border-white/80 flex items-center justify-center">
          <SescLogo className="w-40 h-40 text-white" />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
          CADASTRE-SE
        </h1>

        {/* Mensagem de erro */}
        {error && (
          <div className="w-[400px] md:w-[460px] bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form
          className="flex flex-col items-center gap-6 w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          {/* Nome */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            Nome completo *
          </span>
          <input
            name="nome_completo"
            value={formData.nome_completo}
            onChange={handleChange}
            placeholder="digite seu nome completo"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />

          {/* CPF com máscara */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            cpf
          </span>
          <MaskedInput
            mask="999.999.999-99"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />

          {/* Telefone com máscara */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            telefone
          </span>
          <MaskedInput
            mask="(99) 99999-9999"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />

          {/* E-mail */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            email *
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="digite seu email"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />
          <p className="w-[400px] md:w-[460px] text-xs text-white/70 -mt-4">
            💡 Dica: Use @adm.com para Admin ou @admMaster.com para Master
          </p>

          {/* Senha */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            senha *
          </span>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="digite sua senha"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />
        </form>
      </div>

      {/* Botão ENTER no canto inferior direito */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="fixed bottom-8 right-10 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-12 py-4 rounded text-xl shadow-lg"
      >
        {loading ? "CADASTRANDO..." : "CADASTRAR"}
      </button>

      {/* Voltar */}
      <Link
        to="/sesc"
        aria-label="Voltar para Sesc"
        className="absolute bottom-6 left-6 text-white/90 px-4 py-2 border border-white/40 rounded hover:text-white"
      >
        voltar
      </Link>
    </div>
  );
}
