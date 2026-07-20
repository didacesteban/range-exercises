import type { RangeHandle } from "@/app/components/range/IRangeViewModel";

export interface RangeModelParams {
	min?: number;
	max?: number;
	values?: number[];
}

export interface RangeModel {
	points: number[] | null;
	boundMin: number;
	boundMax: number;
}

export function createRangeModel({
	min = 0,
	max = 100,
	values,
}: RangeModelParams): RangeModel {
	const points =
		values && values.length > 0 ? [...values].sort((a, b) => a - b) : null;
	return {
		points,
		boundMin: points ? points[0] : min,
		boundMax: points ? points[points.length - 1] : max,
	};
}

export function clamp(value: number, low: number, high: number): number {
	return Math.min(Math.max(value, low), high);
}

export function nearestPoint(value: number, points: number[]): number {
	return points.reduce((closest, point) =>
		Math.abs(point - value) < Math.abs(closest - value) ? point : closest,
	);
}

export function stepPoint(
	points: number[],
	value: number,
	direction: 1 | -1,
): number {
	const index = points.indexOf(value);
	return points[clamp(index + direction, 0, points.length - 1)];
}

export function resolveHandleValue(
	model: RangeModel,
	handle: RangeHandle,
	candidate: number,
	otherValue: number,
): number {
	if (model.points) {
		const points = model.points;
		const candidateIndex = points.indexOf(nearestPoint(candidate, points));
		const otherIndex = points.indexOf(otherValue);
		return handle === "min"
			? points[clamp(candidateIndex, 0, otherIndex)]
			: points[clamp(candidateIndex, otherIndex, points.length - 1)];
	}
	return handle === "min"
		? clamp(candidate, model.boundMin, otherValue)
		: clamp(candidate, otherValue, model.boundMax);
}
