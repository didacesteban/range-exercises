"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default function AppWrapper({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<>
			<Header onMenuClick={() => setIsSidebarOpen(true)} />
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			<main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{children}
			</main>
		</>
	);
}
