import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../img/bg-senac.png";

function SescLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 140 140" className={className}>
      <circle cx="70" cy="70" r="58" fill="none" stroke="white" strokeWidth="2" />
      <path d="M26 52 C 58 30, 82 30, 114 52" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text
        x="70"
        y="85"
        textAnchor="middle"
        fontWeight="900"
        fontSize="40"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="white"
      >
        sesc
      </text>
    </svg>
  );
}

export default function CadastroSesc() {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bg})`, backgroundColor: "#ffffff" }}
    >
      <div className="min-h-screen flex flex-col items-center pt-10">
        {/* Logo */}
        <SescLogo className="w-40 h-40 text-white mb-2" />

        {/* Título */}
        <h1 className="text-white font-extrabold tracking-wide text-xl mb-4">
          CADASTRE-SE
        </h1>

        {/* Formulário */}
        <form
          className="flex flex-col items-center gap-3 w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Nome */}
          <div className="w-full flex flex-col items-center">
            <label className="text-white text-sm font-semibold mb-1">Nome completo</label>
            <input
              type="text"
              placeholder="digite seu nome completo"
              className="w-[280px] md:w-[320px] rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 px-4 py-2 outline-none focus:border-white/70"
            />
          </div>

          {/* CPF */}
          <div className="w-full flex flex-col items-center">
            <label className="text-white text-sm font-semibold mb-1">cpf</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="digite seu cpf"
              className="w-[280px] md:w-[320px] rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 px-4 py-2 outline-none focus:border-white/70"
            />
          </div>

          {/* Telefone */}
          <div className="w-full flex flex-col items-center">
            <label className="text-white text-sm font-semibold mb-1">telefone</label>
            <input
              type="tel"
              placeholder="digite seu telefone"
              className="w-[280px] md:w-[320px] rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 px-4 py-2 outline-none focus:border-white/70"
            />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col items-center">
            <label className="text-white text-sm font-semibold mb-1">email</label>
            <input
              type="email"
              placeholder="seu email"
              className="w-[280px] md:w-[320px] rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 px-4 py-2 outline-none focus:border-white/70"
            />
          </div>

          {/* Senha */}
          <div className="w-full flex flex-col items-center">
            <label className="text-white text-sm font-semibold mb-1">senha</label>
            <input
              type="password"
              placeholder="digite sua senha"
              className="w-[280px] md:w-[320px] rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 px-4 py-2 outline-none focus:border-white/70"
            />
          </div>
        </form>

        {/* Botão ENTER no canto inferior direito */}
        <button
          type="button"
          className="fixed bottom-8 right-10 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-2 rounded shadow"
          onClick={() => navigate("/ProdutoSesc")}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
