import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
	IRangeViewModel,
	IRangeViewModelParams,
	RangeHandle,
} from "@/app/components/range/IRangeViewModel";
import {
	clamp,
	createRangeModel,
	nearestPoint,
	resolveHandleValue,
	stepPoint,
} from "@/app/components/range/rangeModel";

const CURRENCY_FORMATTER = new Intl.NumberFormat("es-ES", {
	style: "currency",
	currency: "EUR",
});

export function useRangeViewModel({
	min = 0,
	max = 100,
	step = 1,
	values,
	defaultMinValue,
	defaultMaxValue,
}: IRangeViewModelParams): IRangeViewModel {
	const model = useMemo(
		() => createRangeModel({ min, max, values }),
		[min, max, values],
	);
	const { points, boundMin, boundMax } = model;

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
			if (dragging === "min") {
				setMinValue(
					resolveHandleValue(model, "min", value, maxValueRef.current),
				);
			} else {
				setMaxValue(
					resolveHandleValue(model, "max", value, minValueRef.current),
				);
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
	}, [dragging, valueFromClientX, model]);

	const nudge = (handle: RangeHandle, direction: 1 | -1) => {
		const current = handle === "min" ? minValue : maxValue;
		const other = handle === "min" ? maxValue : minValue;
		const candidate = points
			? stepPoint(points, current, direction)
			: current + direction * step;
		const resolved = resolveHandleValue(model, handle, candidate, other);
		if (handle === "min") setMinValue(resolved);
		else setMaxValue(resolved);
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
			const other = editing === "min" ? maxValue : minValue;
			const resolved = resolveHandleValue(model, editing, parsed, other);
			if (editing === "min") setMinValue(resolved);
			else setMaxValue(resolved);
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
