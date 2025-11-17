import React from "react";
import { Link, useNavigate } from "react-router-dom"; // + useNavigate

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
  const navigate = useNavigate(); // navegação

  const handleEnter = () => {
    // aqui poderia validar login antes
    navigate("/lojas");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B4A80] text-white overflow-hidden">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-4">
        {/* Logo (maior) */}
        <div className="w-56 h-56 rounded-full border border-white/80 flex items-center justify-center">
          <SescLogo className="w-32 h-32 text-white" />
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
          ENTRAR
        </h1>

        {/* Formulário */}
        <form
          className="flex flex-col items-center gap-4 w-full max-w-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="w-[340px] md:w-[380px] text-center bg-blue-800/90 text-white text-base md:text-lg font-bold rounded-md py-2">
            e-mail
          </span>
          <input
            type="email"
            placeholder="seu email"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-blue-800/40 text-white placeholder-white/70 px-5 py-3 md:py-3.5 outline-none focus:border-white"
          />

          <span className="w-[340px] md:w-[380px] text-center bg-blue-800/90 text-white text-base md:text-lg font-bold rounded-md py-2">
            senha
          </span>
          <input
            type="password"
            placeholder="sua senha"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-blue-800/40 text-white placeholder-white/70 px-5 py-3 md:py-3.5 outline-none focus:border-white"
          />

          <button
            type="submit"
            className="sr-only"
          >
            enviar
          </button>
        </form>

        <Link
          to="/sesc/cadastro"
          className="text-white/90 hover:text-white text-base underline"
        >
          criar conta
        </Link>
      </div>

      <button
        type="button"
        onClick={handleEnter} // navega para /lojas
        className="fixed bottom-6 right-8 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-3 rounded text-lg"
      >
        ENTRAR
      </button>

      <Link
        to="/sesc"
        className="absolute bottom-6 left-6 text-white/90 hover:text-white px-4 py-2 border border-white/40 rounded transition-colors"
      >
        voltar
      </Link>
    </div>
  );
}
