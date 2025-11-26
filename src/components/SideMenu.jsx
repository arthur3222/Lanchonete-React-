import React from "react";

export default function SideMenu({ open, onClose, title, items, accent = "bg-blue-800" }) {
  return (
    <>
      {open && (
        <button
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] ${accent} text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow-lg flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 text-xl"
          >
            ×
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.map(it => (
            <div
              key={it.path + it.label}
              onClick={onClose}
              className="block w-full text-center font-semibold bg-white/15 rounded px-3 py-2 cursor-default"
            >
              {it.label}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
