"use client";

import MenuLink from "@/app/components/menu-link/MenuLink";

export default function Sidebar({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	return (
		<div className="md:hidden">
			{isOpen && (
				<button
					type="button"
					aria-label="Cerrar menú"
					onClick={onClose}
					className="fixed inset-0 z-40 bg-black/40"
				/>
			)}
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white px-6 py-5 transition-transform dark:border-gray-800 dark:bg-gray-900 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<nav className="flex flex-col gap-6 text-xs font-medium uppercase tracking-widest text-gray-800 dark:text-gray-100">
					<MenuLink href="/exercise/1" title="Exercise 1" onClick={onClose} />
					<MenuLink href="/exercise/2" title="Exercise 2" onClick={onClose} />
				</nav>
			</aside>
		</div>
	);
}
