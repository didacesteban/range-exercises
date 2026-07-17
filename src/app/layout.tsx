import type { ReactNode } from "react";
import AppWrapper from "@/app/components/app-wrapper/AppWrapper";
import "./globals.css";

export const metadata = {
	title: "RANGE",
	description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es">
			<body>
				<AppWrapper>{children}</AppWrapper>
			</body>
		</html>
	);
}
