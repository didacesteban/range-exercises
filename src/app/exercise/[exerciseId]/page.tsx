import { notFound } from "next/navigation";

import Range from "@/app/components/range/Range";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import {
	getRangeLimits,
	getRangeValues,
} from "@/app/exercise/[exerciseId]/exerciseService";

export default async function ExercisePage({
	params,
}: {
	params: Promise<{ exerciseId: string }>;
}) {
	const { exerciseId } = await params;

	switch (exerciseId) {
		case "1": {
			const { min, max } = await getRangeLimits();
			return (
				<div className="p-6">
					<SectionTitle title={`Exercise ${exerciseId}`} />
					<div className="mt-8">
						<Range min={min} max={max} />
					</div>
				</div>
			);
		}
		case "2": {
			const { rangeValues } = await getRangeValues();
			return (
				<div className="p-6">
					<SectionTitle title={`Exercise ${exerciseId}`} />
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
