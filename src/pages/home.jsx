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
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Removido cabeçalho absoluto */}
      {/* Bloco central */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-12 px-4">
        <h1 className="text-white drop-shadow text-4xl md:text-5xl lg:text-6xl font-extrabold">
          Bem-vindo
        </h1>

        <div className="flex items-center justify-center gap-16 md:gap-24 lg:gap-32">
          {hasRouter ? (
            <Link
              to="/sesc"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-900 flex items-center justify-center text-4xl md:text-5xl font-bold text-white hover:bg-blue-800 transition-colors"
            >
              sesc
            </Link>
          ) : (
            <a
              href="/sesc"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-900 flex items-center justify-center text-4xl md:text-5xl font-bold text-white hover:bg-blue-800 transition-colors"
            >
              sesc
            </a>
          )}

          {hasRouter ? (
            <Link
              to="/senac"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-900 flex items-center justify-center text-4xl md:text-5xl font-bold text-white hover:bg-blue-800 transition-colors"
            >
              senac
            </Link>
          ) : (
            <a
              href="/senac"
              className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-900 flex items-center justify-center text-4xl md:text-5xl font-bold text-white hover:bg-blue-800 transition-colors"
            >
              senac
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
