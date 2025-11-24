import React from "react";
import { User } from "lucide-react";
import HamburgerMenu from "../components/HamburgerMenu";

export default function LojasSenac() {
  return (
    <div className="relative min-h-screen w-full bg-[#FF7700] text-white flex flex-col items-center justify-center px-4">
      <HamburgerMenu />
      <h1 className="mt-0 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
        SEJA BEM VINDO
      </h1>
      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <User size={80} className="text-[#FF7700]" />
      </div>
      <span className="mt-6 text-xs md:text-sm font-semibold tracking-[0.4em] uppercase">
        LOJAS
      </span>
      <div className="mt-10 w-[300px] h-[220px] relative rounded-md overflow-hidden border border-white/40">
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18px] md:text-[20px] font-extrabold leading-tight tracking-wide text-center">
            FAZER
            <br />
            PEDIDO
          </span>
        </div>
      </div>
    </div>
  );
}
