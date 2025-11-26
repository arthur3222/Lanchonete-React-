import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SenacLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 120 60" className={className}>
      <path d="M10 18 C 38 -2, 82 -2, 110 18" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="60" y="45" textAnchor="middle" fontWeight="900" fontSize="32" fontFamily="Arial, Helvetica, sans-serif" fill="currentColor">
        senac
      </text>
    </svg>
  );
}

export default function SenacLogin() {
  const navigate = useNavigate();
  const handleEnter = () => {
    // validações poderiam ir aqui
    navigate("/lojasenac"); // navegar para página de lojas do SENAC após login
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

        <form
          className="flex flex-col items-center gap-4 w-full max-w-md"
          onSubmit={(e) => { e.preventDefault(); handleEnter(); }} // <-- submeter navega
        >
          <span className="w-[340px] md:w-[380px] text-center bg-white/25 text-white text-base md:text-lg font-bold rounded-md py-2">
            e-mail
          </span>
          <input
            type="email"
            placeholder="seu email"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-white/20 text-white placeholder-white/80 px-5 py-3 md:py-3.5 outline-none focus:border-white"
          />

          <span className="w-[340px] md:w-[380px] text-center bg-white/25 text-white text-base md:text-lg font-bold rounded-md py-2">
            senha
          </span>
          <input
            type="password"
            placeholder="sua senha"
            className="w-[340px] md:w-[380px] rounded-md border border-white/50 bg-white/20 text-white placeholder-white/80 px-5 py-3 md:py-3.5 outline-none focus:border-white"
          />

          <button type="submit" className="sr-only">enviar</button>
        </form>

        <Link
          to="/senac/cadastro"
          className="text-white/90 text-base underline hover:opacity-90"
        >
          criar conta
        </Link>
      </div>

      <button
        type="button"
        onClick={handleEnter}
        className="fixed bottom-6 right-8 bg-white text-[#FF7700] hover:bg-white/90 font-bold px-10 py-3 rounded text-lg"
      >
        ENTRAR
      </button>

      <Link
        to="/senac"
        className="absolute bottom-6 left-6 text-white/90 px-4 py-2 border border-white/40 rounded hover:text-white"
        aria-label="Voltar para Senac"
      >
        voltar
      </Link>
    </div>
  );
}
