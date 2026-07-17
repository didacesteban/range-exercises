import { headers } from "next/headers";
import { notFound } from "next/navigation";

import type { ExerciseOneResponse, ExerciseTwoResponse } from "@/app/api/types";
import Range from "@/app/components/range/Range";
import SectionTitle from "@/app/components/section-title/SectionTitle";

async function getBaseUrl() {
	const headersList = await headers();
	const host = headersList.get("host");
	const protocol = host?.startsWith("localhost") ? "http" : "https";
	return `${protocol}://${host}`;
}

export default async function ExercisePage({
	params,
}: {
	params: Promise<{ exerciseId: string }>;
}) {
	const { exerciseId } = await params;
	const baseUrl = await getBaseUrl();

	switch (exerciseId) {
		case "1": {
			const res = await fetch(`${baseUrl}/api/exercise-1`, {
				cache: "no-store",
			});
			const { min, max } = (await res.json()) as ExerciseOneResponse;
			return (
				<div className="p-6">
					<SectionTitle title="Exercise 1"/>
					<div className="mt-8">
						<Range min={min} max={max} />
					</div>
				</div>
			);
		}
		case "2": {
			const res = await fetch(`${baseUrl}/api/exercise-2`, {
				cache: "no-store",
			});
			const { rangeValues } = (await res.json()) as ExerciseTwoResponse;
			return (
				<div className="p-6">
					<SectionTitle title="Exercise 2"/>
					<div className="mt-8">
						<Range values={rangeValues} />
					</div>
				</div>
			);
		}
		default:
			notFound();
	}
}
