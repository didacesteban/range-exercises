import type { ReactNode } from "react";

interface FooterLinkProps {
	href: string;
	children: ReactNode;
}

export default function FooterLink({ href, children }: FooterLinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-gray-600 underline transition-colors dark:hover:text-gray-300"
		>
			{children}
		</a>
	);
}
