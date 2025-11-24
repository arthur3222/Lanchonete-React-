import React from "react";

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

        {/* Formulário */}
        <form
          className="flex flex-col items-center gap-6 w-full max-w-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Nome */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            Nome completo
          </span>
          <input
            placeholder="digite seu nome completo"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
          />

          {/* CPF */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            cpf
          </span>
          <input
            inputMode="numeric"
            placeholder="digite seu cpf"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
          />

          {/* Telefone */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            telefone
          </span>
          <input
            type="tel"
            placeholder="digite seu telefone"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
          />

          {/* E-mail */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            email
          </span>
          <input
            type="email"
            placeholder="digite seu email"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
          />

          {/* Senha */}
          <span className="w-[400px] md:w-[460px] text-center bg-blue-800/90 text-white text-lg md:text-xl font-bold rounded-md py-3">
            senha
          </span>
          <input
            type="password"
            placeholder="digite sua senha"
            className="w-[400px] md:w-[460px] rounded-md border border-white/60 bg-blue-800/40 text-white placeholder-white/60 px-6 py-4 outline-none focus:border-white"
          />
        </form>
      </div>

      {/* Botão ENTER no canto inferior direito */}
      <button
        type="button"
        className="fixed bottom-8 right-10 bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-4 rounded text-xl shadow-lg"
      >
        ENTER
      </button>

      {/* Voltar */}
      <a
        href="/sesc"
        className="absolute bottom-6 left-6 text-white/90 hover:text-white px-4 py-2 border border-white/40 rounded transition-colors"
      >
        voltar
      </a>
    </div>
  );
}
