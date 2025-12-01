import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function SescLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnter = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (authError) throw new Error(authError.message);

      // Tenta pegar role do user_metadata
      let role = authData?.user?.user_metadata?.role || null;
      let userData = null;

      if (!role) {
        // Buscar apenas o próprio registro (sem causar recursão)
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        if (error) throw new Error(error.message);
        userData = data;
        role = data.role;
      } else {
        // Monta userData mínimo quando role vem do metadata
        userData = {
          id: authData.user.id,
          email: authData.user.email,
          nome_completo: authData.user.user_metadata?.nome_completo || '',
          cpf: null,
          telefone: null,
          role
        };
      }

      localStorage.setItem('authUser', JSON.stringify({
        ...userData,
        token: authData.session.access_token
      }));

      const { error: auditError } = await supabase.from('auditoria').insert({
        usuario_id: userData.id,
        acao: 'LOGIN',
        tabela: 'usuarios',
        registro_id: userData.id
      });
      if (auditError) console.error("Erro auditoria:", auditError.message);

      if (role === "admin" || role === "master") navigate("/adminSesc");
      else navigate("/lojasesc");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B4A80] text-white overflow-hidden">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-14 px-4">
        {/* Logo (maior) */}
        <div className="w-64 h-64 rounded-full border border-white/80 flex items-center justify-center">
          <SescLogo className="w-40 h-40 text-white" />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
          ENTRAR
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
          onSubmit={handleEnter}
        >
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            e-mail
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu email"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />

          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            senha
          </span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="sua senha"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
            disabled={loading}
          />

          <button type="submit" className="sr-only">
            enviar
          </button>
        </form>

        <Link
          to="/sesc/cadastro"
          className="text-white/90 text-lg underline hover:opacity-90"
        >
          criar conta
        </Link>
      </div>

      <button
        type="button"
        onClick={handleEnter}
        disabled={loading}
        className="fixed bottom-8 right-10 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-12 py-4 rounded text-xl shadow-lg"
      >
        {loading ? "ENTRANDO..." : "ENTRAR"}
      </button>

      <Link
        to="/sesc"
        className="absolute bottom-6 left-6 text-white/90 px-4 py-2 border border-white/40 rounded hover:text-white"
        aria-label="Voltar para Sesc"
      >
        voltar
      </Link>
    </div>
  );
}
