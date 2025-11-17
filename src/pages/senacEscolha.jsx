import React from "react";
import { Link } from "react-router-dom";

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

export default function SenacEscolha() {
  return (
    <div className="relative min-h-screen w-full bg-[#FF7700] text-white overflow-hidden">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-4">
        <div className="w-56 h-56 rounded-full border border-white/80 flex items-center justify-center">
          <SenacLogo className="w-32 h-32 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide">
          SENAC
        </h1>

        <div className="flex flex-col items-center gap-5">
          <Link
            to="/senac/login"
            className="w-[340px] md:w-[380px] lg:w-[420px] text-center px-6 py-3 md:py-4 rounded-md border border-white/60 bg-white/20 hover:bg-white/30 transition-colors text-lg md:text-xl font-semibold"
          >
            entrar
          </Link>
          <Link
            to="/senac/cadastro"
            className="w-[340px] md:w-[380px] lg:w-[420px] text-center px-6 py-3 md:py-4 rounded-md border border-white/60 bg-white/20 hover:bg白/30 transition-colors text-lg md:text-xl font-semibold"
          >
            cadastrar
          </Link>
        </div>
      </div>

      <Link
        to="/"
        className="absolute bottom-6 left-6 text-white/90 hover:text-white px-4 py-2 border border-white/40 rounded transition-colors"
      >
        voltar
      </Link>
    </div>
  );
}
