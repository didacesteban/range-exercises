"use client";

import Link from "next/link";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
	return (
		<header className="grid grid-cols-3 items-center border-b border-gray-200 px-6 py-3">
			<div className="justify-self-start">
				<nav className="hidden gap-6 text-xs font-medium uppercase tracking-widest text-gray-800 md:flex">
					<Link href="/exercise/1">Exercise 1</Link>
					<Link href="/exercise/2">Exercise 2</Link>
				</nav>
				<button
					type="button"
					onClick={onMenuClick}
					aria-label="Abrir menú"
					className="md:hidden"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						aria-hidden="true"
					>
						<line x1="3" y1="6" x2="21" y2="6" />
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>
			</div>
			<Link
				href="/"
				className="justify-self-center text-2xl font-semibold uppercase tracking-[0.3em]"
			>
				RANGE
			</Link>
			<div />
		</header>
	);
}
