import { notFound } from "next/navigation";

import RangeSection from "@/app/components/range-section/RangeSection";
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
	const sectionTitle: string = `Exercise ${exerciseId}`;

	switch (exerciseId) {
		case "1": {
			const { min, max } = await getRangeLimits();
			return <RangeSection title={sectionTitle} min={min} max={max} />;
		}
		case "2": {
			const { rangeValues } = await getRangeValues();
			return <RangeSection title={sectionTitle} values={rangeValues} />;
		}
		default:
			notFound();
	}
}
