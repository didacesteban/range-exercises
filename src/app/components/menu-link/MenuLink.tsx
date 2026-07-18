"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
	href: string;
	title: string;
	onClick?: () => void;
}

export default function MenuLink({ href, title, onClick }: MenuLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`border-b pb-0.5 transition-colors hover:border-gray-800 dark:hover:border-gray-100 ${
				isActive ? "border-gray-800 dark:border-gray-100" : "border-transparent"
			}`}
		>
			{title}
		</Link>
	);
}
