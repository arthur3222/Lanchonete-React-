import React from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

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

export default function SenacCadastro() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#FF7700] text-white overflow-hidden pb-24 md:pb-32">
      <HamburgerMenu />
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-14 px-4">
        <div className="w-64 h-64 rounded-full border border-white/80 flex items-center justify-center">
          <SenacLogo className="w-40 h-40 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
          CADASTRE-SE
        </h1>
        <form
          className="flex flex-col items-center gap-6 w-full max-w-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="w-[400px] md:w-[460px] text-center bg-white/30 text-white text-lg md:text-xl font-bold rounded-md py-3">
            Nome completo
          </span>
          <input
            placeholder="digite seu nome completo"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-white/25 text-white placeholder-white/70 px-6 py-4 outline-none focus:border-white"
          />

          <span className="w-[400px] md:w-[460px] text-center bg-white/30 text-white text-lg md:text-xl font-bold rounded-md py-3">
            cpf
          </span>
          <input
            inputMode="numeric"
            placeholder="digite seu cpf"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-white/25 text-white placeholder-white/70 px-6 py-4 outline-none focus:border-white"
          />

          <span className="w-[400px] md:w-[460px] text-center bg-white/30 text-white text-lg md:text-xl font-bold rounded-md py-3">
            telefone
          </span>
          <input
            type="tel"
            placeholder="digite seu telefone"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-white/25 text-white placeholder-white/70 px-6 py-4 outline-none focus:border-white"
          />

          <span className="w-[400px] md:w-[460px] text-center bg-white/30 text-white text-lg md:text-xl font-bold rounded-md py-3">
            email
          </span>
          <input
            type="email"
            placeholder="digite seu email"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-white/25 text-white placeholder-white/70 px-6 py-4 outline-none focus:border-white"
          />

          <span className="w-[400px] md:w-[460px] text-center bg-white/30 text-white text-lg md:text-xl font-bold rounded-md py-3">
            senha
          </span>
          <input
            type="password"
            placeholder="digite sua senha"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-white/25 text-white placeholder-white/70 px-6 py-4 outline-none focus:border-white"
          />
        </form>
      </div>
      <button
        type="button"
        className="fixed bottom-8 right-10 bg-white text-[#FF7700] hover:bg-white/90 font-bold px-12 py-4 rounded text-xl shadow-lg"
        onClick={() => navigate("/ProdutoSenac")}
      >
        ENTER
      </button>

      <div className="absolute bottom-6 left-6 text-white/90 px-4 py-2 border border-white/40 rounded">voltar</div>
    </div>
  );
}
