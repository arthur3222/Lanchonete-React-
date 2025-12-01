import React from "react";
import { Link } from "react-router-dom";

export default function SideMenu({ open, onClose, title = "hamburger pedido", items = [], role = null }) {
	return (
		<>
			{/* Overlay */}
			{open && (
				<div
					className="fixed inset-0 bg-black/50 z-40"
					onClick={onClose}
				/>
			)}

			{/* Painel */}
			<div
				className={`fixed top-0 left-0 h-full w-80 bg-[#0B4A80] text-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Header */}
				<div className="relative flex items-center justify-center h-16 border-b border-white/10">
					<span className="text-sm font-semibold tracking-wider uppercase">{title}</span>
					<button
						onClick={onClose}
						className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
					>
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M18 6L6 18M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Botões */}
				<nav className="flex-1 flex flex-col items-center justify-start gap-4 pt-8 px-6">
					{items.map((item, idx) => (
						<Link
							key={idx}
							to={item.path}
							onClick={onClose}
							className="w-full max-w-xs py-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center transition-colors"
						>
							{item.label}
						</Link>
					))}

					{/* Botões de Admin */}
					{(role === "admin" || role === "master") && (
						<div className="w-full max-w-xs border-t border-white/20 pt-4 mt-2">
							<Link
								to={title.includes("sesc") || title.includes("Sesc") ? "/adminSesc" : "/adminSenac"}
								onClick={onClose}
								className="block w-full py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold text-center transition-colors mb-3"
							>
								⚙️ Painel Admin
							</Link>
							
							{role === "master" && (
								<Link
									to="/masterAdmin"
									onClick={onClose}
									className="block w-full py-3 rounded-md bg-purple-800 hover:bg-purple-900 text-white font-semibold text-center transition-colors"
								>
									👑 Admin Master
								</Link>
							)}
						</div>
					)}
				</nav>

				{/* Footer */}
				<div className="flex items-center justify-start p-6">
					<button
						onClick={onClose}
						className="flex items-center gap-2 text-white/80 hover:text-white"
					>
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
