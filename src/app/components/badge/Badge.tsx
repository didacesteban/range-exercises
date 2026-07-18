import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
	return (
		<span className="text-xs font-medium px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md">
			{children}
		</span>
	);
}
