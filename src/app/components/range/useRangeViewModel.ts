import { useCallback, useEffect, useRef, useState } from "react";
import type {
	IRangeViewModel,
	IRangeViewModelParams,
	RangeHandle,
} from "@/app/components/range/IRangeViewModel";

const CURRENCY_FORMATTER = new Intl.NumberFormat("es-ES", {
	style: "currency",
	currency: "EUR",
});

function clamp(value: number, low: number, high: number) {
	return Math.min(Math.max(value, low), high);
}

function nearestPoint(value: number, points: number[]) {
	return points.reduce((closest, point) =>
		Math.abs(point - value) < Math.abs(closest - value) ? point : closest,
	);
}

export function useRangeViewModel({
	min = 0,
	max = 100,
	step = 1,
	values,
	defaultMinValue,
	defaultMaxValue,
}: IRangeViewModelParams): IRangeViewModel {
	const points =
		values && values.length > 0 ? [...values].sort((a, b) => a - b) : null;
	const boundMin = points ? points[0] : min;
	const boundMax = points ? points[points.length - 1] : max;

	const [minValue, setMinValue] = useState(() =>
		points
			? nearestPoint(defaultMinValue ?? boundMin, points)
			: (defaultMinValue ?? boundMin),
	);
	const [maxValue, setMaxValue] = useState(() =>
		points
			? nearestPoint(defaultMaxValue ?? boundMax, points)
			: (defaultMaxValue ?? boundMax),
	);
	const [dragging, setDragging] = useState<RangeHandle | null>(null);
	const [editing, setEditing] = useState<RangeHandle | null>(null);
	const [draft, setDraft] = useState("");

	const trackRef = useRef<HTMLDivElement>(null);
	const editInputRef = useRef<HTMLInputElement>(null);
	const minValueRef = useRef(minValue);
	const maxValueRef = useRef(maxValue);
	minValueRef.current = minValue;
	maxValueRef.current = maxValue;

	useEffect(() => {
		if (editing) editInputRef.current?.focus();
	}, [editing]);

	const valueFromClientX = useCallback(
		(clientX: number) => {
			const track = trackRef.current;
			if (!track) return boundMin;
			const rect = track.getBoundingClientRect();
			const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
			if (points) {
				const index = Math.round(ratio * (points.length - 1));
				return points[clamp(index, 0, points.length - 1)];
			}
			const raw = min + ratio * (max - min);
			return clamp(Math.round(raw / step) * step, min, max);
		},
		[points, min, max, step, boundMin],
	);

	useEffect(() => {
		if (!dragging) return;

		const handlePointerMove = (event: PointerEvent) => {
			const value = valueFromClientX(event.clientX);
			if (points) {
				const candidateIndex = points.indexOf(value);
				if (dragging === "min") {
					const maxIndex = points.indexOf(maxValueRef.current);
					setMinValue(points[clamp(candidateIndex, 0, maxIndex)]);
				} else {
					const minIndex = points.indexOf(minValueRef.current);
					setMaxValue(
						points[clamp(candidateIndex, minIndex, points.length - 1)],
					);
				}
				return;
			}
			if (dragging === "min") {
				setMinValue(clamp(value, min, maxValueRef.current));
			} else {
				setMaxValue(clamp(value, minValueRef.current, max));
			}
		};
		const stopDragging = () => setDragging(null);

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", stopDragging);
		document.body.style.cursor = "grabbing";

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", stopDragging);
			document.body.style.cursor = "";
		};
	}, [dragging, valueFromClientX, points, min, max]);

	const nudge = (handle: RangeHandle, direction: 1 | -1) => {
		if (points) {
			const currentIndex = points.indexOf(
				handle === "min" ? minValue : maxValue,
			);
			const otherIndex = points.indexOf(handle === "min" ? maxValue : minValue);
			if (handle === "min") {
				setMinValue(points[clamp(currentIndex + direction, 0, otherIndex)]);
			} else {
				setMaxValue(
					points[
						clamp(currentIndex + direction, otherIndex, points.length - 1)
					],
				);
			}
			return;
		}
		const delta = direction * step;
		if (handle === "min") {
			setMinValue((current) => clamp(current + delta, min, maxValue));
		} else {
			setMaxValue((current) => clamp(current + delta, minValue, max));
		}
	};

	const handleKeyDown =
		(handle: RangeHandle) => (event: React.KeyboardEvent) => {
			if (event.key === "ArrowRight" || event.key === "ArrowUp") {
				event.preventDefault();
				nudge(handle, 1);
			} else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
				event.preventDefault();
				nudge(handle, -1);
			} else if (event.key === "Home") {
				event.preventDefault();
				if (handle === "min") setMinValue(boundMin);
				else setMaxValue(minValue);
			} else if (event.key === "End") {
				event.preventDefault();
				if (handle === "min") setMinValue(maxValue);
				else setMaxValue(boundMax);
			}
		};

	const startEditing = (handle: RangeHandle) => {
		setEditing(handle);
		setDraft(String(handle === "min" ? minValue : maxValue));
	};

	const cancelEditing = () => setEditing(null);

	const commitEdit = () => {
		if (!editing) return;
		const parsed = Number.parseFloat(draft.replace(",", "."));
		if (!Number.isNaN(parsed)) {
			if (points) {
				const nearest = nearestPoint(parsed, points);
				if (editing === "min") {
					const maxIndex = points.indexOf(maxValue);
					setMinValue(points[clamp(points.indexOf(nearest), 0, maxIndex)]);
				} else {
					const minIndex = points.indexOf(minValue);
					setMaxValue(
						points[clamp(points.indexOf(nearest), minIndex, points.length - 1)],
					);
				}
			} else if (editing === "min") {
				setMinValue(clamp(parsed, min, maxValue));
			} else {
				setMaxValue(clamp(parsed, minValue, max));
			}
		}
		setEditing(null);
	};

	const percentFor = (value: number) => {
		if (points) {
			return (points.indexOf(value) / (points.length - 1)) * 100;
		}
		return ((value - min) / (max - min)) * 100;
	};

	return {
		trackRef,
		editInputRef,
		boundMin,
		boundMax,
		minValue,
		maxValue,
		minValueLabel: CURRENCY_FORMATTER.format(minValue),
		maxValueLabel: CURRENCY_FORMATTER.format(maxValue),
		minPercent: percentFor(minValue),
		maxPercent: percentFor(maxValue),
		dragging,
		editing,
		draft,
		setDraft,
		startDragging: setDragging,
		handleKeyDown,
		startEditing,
		cancelEditing,
		commitEdit,
	};
}
