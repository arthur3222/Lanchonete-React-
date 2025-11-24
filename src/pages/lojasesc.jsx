import React from "react";
import { User } from "lucide-react";
import HamburgerMenu from "../components/HamburgerMenu"; // import adicionado

export default function Lojas() {
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-center px-4">
      <HamburgerMenu /> {/* hambúrguer funcional */}
      <h1 className="mt-0 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
        SEJA BEM VINDO
      </h1>

      {/* Avatar círculo branco */}
      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <User size={80} className="text-black" />
      </div>

      {/* Label LOJAS */}
      <span className="mt-6 text-xs md:text-sm font-semibold tracking-[0.4em] uppercase">
        LOJAS
      </span>

      {/* Card Fazer Pedido */}
      <div className="mt-10 w-[300px] h-[220px] relative rounded-md overflow-hidden border border-white/30">
        <img
          src="/img/pedido.png"
          alt="Fazer pedido"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18px] md:text-[20px] font-extrabold leading-tight text-white tracking-wide text-center">
            FAZER
            <br />
            PEDIDO
          </span>
        </div>
      </div>
    </div>
  );
}
