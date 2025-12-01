import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "../components/LoadingSpinner";

function SenacLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-label="Logo Senac">
      <path d="M10 18 C 38 -2, 82 -2, 110 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="60" y="45" textAnchor="middle" fontWeight="900" fontSize="32" fontFamily="Arial, Helvetica, sans-serif" fill="currentColor">
        senac
      </text>
    </svg>
  );
}

const ERROR_MESSAGES = {
  'Invalid login credentials': 'Email ou senha incorretos',
  'Email not confirmed': 'Confirme seu email antes de fazer login',
  'default': 'Erro ao fazer login. Tente novamente.',
};

export default function SenacLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Limpar erro ao digitar
  };

  const handleEnter = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.senha,
      });

      if (authError) {
        const friendlyMessage = ERROR_MESSAGES[authError.message] || ERROR_MESSAGES.default;
        throw new Error(friendlyMessage);
      }

      if (!authData?.user) {
        throw new Error("Erro ao autenticar usuário");
      }

      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        throw new Error("Usuário não encontrado no sistema");
      }

      localStorage.setItem('authUser', JSON.stringify({
        ...userData,
        token: authData.session.access_token
      }));

      // Auditoria em background
      supabase.from('auditoria').insert({
        usuario_id: userData.id,
        acao: 'LOGIN',
        tabela: 'usuarios',
        registro_id: userData.id
      }).then(({ error }) => {
        if (error) console.error("Erro ao registrar auditoria:", error);
      });

      // Redirecionar baseado na role
      const redirectPath = (userData.role === 'admin' || userData.role === 'master') 
        ? "/adminSenac" 
        : "/lojasenac";
      
      navigate(redirectPath, { replace: true });
      
    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FF7700] text-white overflow-hidden">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-4">
        <div className="w-56 h-56 rounded-full border border-white/80 flex items-center justify-center">
          <SenacLogo className="w-32 h-32 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
          ENTRAR
        </h1>

        {error && (
          <div className="w-[340px] md:w-[380px] bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded text-center" role="alert">
            {error}
          </div>
        )}

        <form
          className="flex flex-col items-center gap-4 w-full max-w-md"
          onSubmit={handleEnter}
        >
          <label htmlFor="email" className="w-[340px] md:w-[380px] text-center bg-white/25 text-white text-base md:text-lg font-bold rounded-md py-2">
            e-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu email"
            autoComplete="email"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-white/20 text-white placeholder-white/80 px-5 py-3 md:py-3.5 outline-none focus:border-white transition"
            disabled={loading}
            required
          />

          <label htmlFor="senha" className="w-[340px] md:w-[380px] text-center bg-white/25 text-white text-base md:text-lg font-bold rounded-md py-2">
            senha
          </label>
          <input
            id="senha"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="sua senha"
            autoComplete="current-password"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-white/20 text-white placeholder-white/80 px-5 py-3 md:py-3.5 outline-none focus:border-white transition"
            disabled={loading}
            required
          />
        </form>

        <Link
          to="/senac/cadastro"
          className="text-white/90 text-base underline hover:opacity-90 transition"
        >
          criar conta
        </Link>
      </div>

      <button
        type="button"
        onClick={handleEnter}
        disabled={loading}
        className="fixed bottom-6 right-8 bg-white text-[#FF7700] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed font-bold px-10 py-3 rounded text-lg transition flex items-center gap-2"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" color="orange" />
            <span>ENTRANDO...</span>
          </>
        ) : (
          "ENTRAR"
        )}
      </button>

      <Link
        to="/senac"
        className="absolute bottom-6 left-6 text-white/90 px-4 py-2 border border-white/40 rounded hover:text-white transition"
        aria-label="Voltar para Senac"
      >
        voltar
      </Link>
    </div>
  );
}
