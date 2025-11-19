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
            <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-extrabold relative z-10">
              Bem-vindo
            </h1>

          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:flex-row md:gap-16">
            {hasRouter ? (
              <Link
                to="/sesc"
                aria-label="Ir para Sesc"
                className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform hover:scale-105
                          w-40 sm:w-56 md:w-72 lg:w-96 aspect-square text-lg sm:text-2xl md:text-4xl"
              >
                <span className="uppercase">sesc</span>
              </Link>
            ) : (
              <a
                href="/sesc"
                aria-label="Ir para Sesc"
                className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform hover:scale-105
                           w-40 sm:w-56 md:w-72 lg:w-96 aspect-square text-lg sm:text-2xl md:text-4xl"
              >
                <span className="uppercase">sesc</span>
              </a>
            )}

            {hasRouter ? (
              <Link
                to="/senac"
                aria-label="Ir para Senac"
                className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform hover:scale-105
                           w-40 sm:w-56 md:w-72 lg:w-96 aspect-square text-lg sm:text-2xl md:text-4xl"
              >
                <span className="uppercase">senac</span>
              </Link>
            ) : (
              <a
                href="/senac"
                aria-label="Ir para Senac"
                className="group flex items-center justify-center rounded-full bg-blue-900 text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform hover:scale-105
                           w-40 sm:w-56 md:w-72 lg:w-96 aspect-square text-lg sm:text-2xl md:text-4xl"
              >
                <span className="uppercase">senac</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
