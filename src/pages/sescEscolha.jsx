import React from "react";
import { Link } from "react-router-dom";

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

export default function SescEscolha() {
  return (
    <div className="relative min-h-screen w-full bg-[#0B4A80] text-white overflow-hidden">
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-14 px-4">
        {/* Logo maior */}
        <div className="w-64 h-64 rounded-full border border-white/80 flex items-center justify-center">
          <SescLogo className="w-40 h-40 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
          SESC
        </h1>

        <div className="flex flex-col items-center gap-6">
          <Link
            to="/sesc/login"
            className="w-[380px] md:w-[440px] lg:w-[500px] text-center px-8 py-5 rounded-md border border-white/70 bg-blue-800/70 hover:bg-blue-800/90 transition-colors text-2xl md:text-3xl font-semibold"
          >
            entra
          </Link>
          <Link
            to="/sesc/cadastro"
            className="w-[380px] md:w-[440px] lg:w-[500px] text-center px-8 py-5 rounded-md border border-white/70 bg-blue-800/70 hover:bg-blue-800/90 transition-colors text-2xl md:text-3xl font-semibold"
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
