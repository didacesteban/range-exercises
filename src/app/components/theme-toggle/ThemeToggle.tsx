"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);

	function toggleTheme() {
		const next = !isDark;
		localStorage.setItem("theme", next ? "dark" : "light");
		document.documentElement.classList.toggle("dark", next);
		setIsDark(next);
	}

	useEffect(() => {
		setMounted(true);
		setIsDark(document.documentElement.classList.contains("dark"));

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemChange = (event: MediaQueryListEvent) => {
			if (!localStorage.getItem("theme")) {
				document.documentElement.classList.toggle("dark", event.matches);
				setIsDark(event.matches);
			}
		};
		media.addEventListener("change", handleSystemChange);
		return () => media.removeEventListener("change", handleSystemChange);
	}, []);

	if (!mounted) {
		return <div className="h-5 w-5" aria-hidden="true" />;
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="text-gray-800 transition-colors dark:text-gray-100"
		>
			{isDark ? (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</svg>
			) : (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
				</svg>
			)}
		</button>
	);
}
