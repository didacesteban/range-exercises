import type { ReactNode } from "react";
import AppWrapper from "@/app/components/app-wrapper/AppWrapper";
import "./globals.css";

export const metadata = {
	title: "RANGE",
	description: "",
};

const themeInitScript = `
(function () {
	try {
		var stored = localStorage.getItem("theme");
		var isDark = stored
			? stored === "dark"
			: window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.classList.toggle("dark", isDark);
	} catch (error) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: runs before hydration to avoid a flash of the wrong theme
					dangerouslySetInnerHTML={{ __html: themeInitScript }}
				/>
			</head>
			<body className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
				<AppWrapper>{children}</AppWrapper>
			</body>
		</html>
	);
}
