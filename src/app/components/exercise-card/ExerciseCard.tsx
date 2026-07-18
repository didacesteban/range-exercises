import Link from "next/link";

import Badge from "@/app/components/badge/Badge";

interface ExerciseCardProps {
	href: string;
	title: string;
	badge: string;
	description: string;
}

export default function ExerciseCard({
	href,
	title,
	badge,
	description,
}: ExerciseCardProps) {
	return (
		<Link
			href={href}
			className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-800 transition-all dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-100"
		>
			<div className="flex justify-between items-start mb-2">
				<h3 className="font-bold text-lg group-hover:text-gray-900 dark:group-hover:text-white">
					{title}
				</h3>
				<Badge>{badge}</Badge>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
		</Link>
	);
}
