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

      // Login no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      // Se o erro for de email não confirmado, buscar usuário pelo email
      if (authError?.message.includes('Email not confirmed')) {
        console.warn("Email não confirmado, buscando usuário pelo email...");
        
        // Buscar usuário na tabela usuarios pelo email (com RLS desabilitado se necessário)
        const { data: usuariosData, error: usuariosError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        console.log("Busca por email:", { usuariosData, usuariosError });

        if (usuariosError) {
          console.error("Erro ao buscar usuário:", usuariosError);
          throw new Error(`Erro ao buscar usuário: ${usuariosError.message}`);
        }

        if (!usuariosData) {
          // Usuário não existe na tabela, mas existe no Auth
          // Criar o registro na tabela usuarios
          console.warn("Usuário não encontrado na tabela, criando registro...");
          
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            const novoUsuario = {
              id: user.id,
              email: user.email,
              nome_completo: user.user_metadata?.nome_completo || '',
              cpf: user.user_metadata?.cpf || null,
              telefone: user.user_metadata?.telefone || null,
              role: user.user_metadata?.role || 'aluno'
            };

            const { error: insertError } = await supabase
              .from('usuarios')
              .insert(novoUsuario);
            
            if (insertError) {
              console.error("Erro ao criar usuário na tabela:", insertError);
            }

            // Usar os dados do novo usuário
            const { data: { session } } = await supabase.auth.getSession();

            localStorage.setItem('authUser', JSON.stringify({
              ...novoUsuario,
              token: session?.access_token || ''
            }));

            await supabase.from('auditoria').insert({
              usuario_id: novoUsuario.id,
              acao: 'LOGIN',
              tabela: 'usuarios',
              registro_id: novoUsuario.id
            });

            if (novoUsuario.role === "master" || novoUsuario.role === "admin") {
              navigate("/adminSesc");
            } else {
              navigate("/lojasesc");
            }
            return;
          }
          
          throw new Error("Não foi possível criar registro do usuário. Tente novamente.");
        }

        // Tentar pegar sessão atual
        const { data: { session } } = await supabase.auth.getSession();

        // Salvar no localStorage
        localStorage.setItem('authUser', JSON.stringify({
          id: usuariosData.id,
          email: usuariosData.email,
          nome_completo: usuariosData.nome_completo,
          cpf: usuariosData.cpf,
          telefone: usuariosData.telefone,
          role: usuariosData.role,
          token: session?.access_token || ''
        }));

        // Registrar auditoria
        await supabase.from('auditoria').insert({
          usuario_id: usuariosData.id,
          acao: 'LOGIN',
          tabela: 'usuarios',
          registro_id: usuariosData.id
        });

        // Redirecionar baseado na role
        if (usuariosData.role === "master" || usuariosData.role === "admin") {
          navigate("/adminSesc");
        } else {
          navigate("/lojasesc");
        }
        return;
      }
      
      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error("Email ou senha incorretos");
        }
        throw new Error(authError.message);
      }

      // Verificar se temos usuário ou sessão
      if (!authData?.user && !authData?.session) {
        throw new Error("Credenciais inválidas. Verifique email e senha.");
      }

      const user = authData.user;
      const session = authData.session;

      // Buscar role - prioriza user_metadata
      let role = user?.user_metadata?.role || 'aluno';
      let userData = null;

      // Buscar dados completos na tabela usuarios
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (usuariosError) {
        console.error("Erro ao buscar usuário:", usuariosError);
      }

      if (usuariosData) {
        // Usuário existe na tabela
        userData = usuariosData;
        role = usuariosData.role || role;
      } else {
        // Usuário não existe na tabela, criar registro
        const novoUsuario = {
          id: user.id,
          email: user.email,
          nome_completo: user.user_metadata?.nome_completo || '',
          cpf: user.user_metadata?.cpf || null,
          telefone: user.user_metadata?.telefone || null,
          role: role
        };

        const { error: insertError } = await supabase
          .from('usuarios')
          .insert(novoUsuario);
        
        if (insertError) {
          console.error("Erro ao criar registro de usuário:", insertError);
        }
        
        userData = novoUsuario;
      }

      // Salvar no localStorage
      localStorage.setItem('authUser', JSON.stringify({
        id: userData.id,
        email: userData.email,
        nome_completo: userData.nome_completo,
        cpf: userData.cpf,
        telefone: userData.telefone,
        role: role,
        token: session?.access_token || ''
      }));

      // Registrar auditoria
      const { error: auditError } = await supabase
        .from('auditoria')
        .insert({
          usuario_id: userData.id,
          acao: 'LOGIN',
          tabela: 'usuarios',
          registro_id: userData.id
        });
      
      if (auditError) {
        console.error("Erro ao registrar auditoria:", auditError);
      }

      // Redirecionar baseado na role
      if (role === "master" || role === "admin") {
        navigate("/adminSesc");
      } else {
        navigate("/lojasesc");
      }

    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login. Tente novamente.");
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
