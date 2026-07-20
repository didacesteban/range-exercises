"use client";

import { useEffect, useRef } from "react";
import MenuLink from "@/app/components/menu-link/MenuLink";

export default function Sidebar({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const navRef = useRef<HTMLElement>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			previouslyFocusedRef.current = document.activeElement as HTMLElement;
			navRef.current?.querySelector<HTMLElement>("a")?.focus();
		} else {
			previouslyFocusedRef.current?.focus();
		}
	}, [isOpen]);

	return (
		<div className="md:hidden">
			{isOpen && (
				<button
					type="button"
					aria-label="Close menu"
					onClick={onClose}
					className="fixed inset-0 z-40 bg-black/40"
				/>
			)}
			<aside
				role="dialog"
				aria-modal="true"
				aria-label="Menu"
				onKeyDown={(event) => {
					if (event.key === "Escape") onClose();
				}}
				className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white px-6 py-5 transition-transform dark:border-gray-800 dark:bg-gray-900 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<nav
					ref={navRef}
					className="flex flex-col gap-6 text-xs font-medium uppercase tracking-widest text-gray-800 dark:text-gray-100"
				>
					<MenuLink href="/exercise/1" title="Exercise 1" onClick={onClose} />
					<MenuLink href="/exercise/2" title="Exercise 2" onClick={onClose} />
				</nav>
			</aside>
		</div>
	);
}
