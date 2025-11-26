import React from "react";
import { Link, useInRouterContext } from "react-router-dom";
import bg from "../img/bg-senac.png";

export default function Home() {
  const hasRouter =
    typeof useInRouterContext === "function"
      ? useInRouterContext()
      : false;

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl text-center">
          <div className="relative inline-block mb-8">
            <h1 className="text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wide">
              Bem-vindo
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 sm:gap-12 md:flex-row md:gap-24">
            {/* SESC com navegação */}
            <Link
              to="/sesc"
              aria-label="Ir para Sesc"
              className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors
                         w-56 sm:w-72 md:w-80 lg:w-[26rem] aspect-square text-3xl sm:text-4xl md:text-5xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span className="uppercase">sesc</span>
            </Link>

            {/* SENAC com navegação */}
            <Link
              to="/senac"
              aria-label="Ir para Senac"
              className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors
                         w-56 sm:w-72 md:w-80 lg:w-[26rem] aspect-square text-3xl sm:text-4xl md:text-5xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span className="uppercase">senac</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
