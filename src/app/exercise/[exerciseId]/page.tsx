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
			return (
				<RangeSection
					title={sectionTitle}
					description="A fluid, continuous range slider driven by asynchronous server-side API calls. This scenario demonstrates how dynamic minimum and maximum limits are fetched from an external data source and securely mapped into an isolated MVVM architecture. The handles allow seamless floating-point precision movement while strictly validating boundary constraints to prevent overlap."
					min={min}
					max={max}
				/>
			);
		}
		case "2": {
			const { rangeValues } = await getRangeValues();
			return (
				<RangeSection
					title={sectionTitle}
					description="A custom step-based slider that restricts handle interactions to a fixed array of pricing tiers retrieved dynamically via HTTP requests. Instead of operating on raw numbers, the system maps the visual UI state to specific indices driven by a strict API contract. The component automatically snaps to predefined custom intervals, showcasing complex state evaluation and decoupled business logic."
					values={rangeValues}
				/>
			);
		}
		default:
			notFound();
	}
}
