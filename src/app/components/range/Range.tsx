"use client";

import type { IRangeViewModelParams } from "@/app/components/range/IRangeViewModel";
import { useRangeViewModel } from "@/app/components/range/useRangeViewModel";

export default function Range(props: IRangeViewModelParams) {
	const {
		trackRef,
		editInputRef,
		boundMin,
		boundMax,
		minValue,
		maxValue,
		minValueLabel,
		maxValueLabel,
		minPercent,
		maxPercent,
		dragging,
		editing,
		draft,
		setDraft,
		startDragging,
		handleKeyDown,
		startEditing,
		cancelEditing,
		commitEdit,
	} = useRangeViewModel(props);

	return (
		<div className="w-full">
			<div
				ref={trackRef}
				data-testid="range-track"
				className="relative flex h-6 items-center"
			>
				<div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-300 dark:bg-gray-700" />
				<div
					className="absolute top-1/2 h-px -translate-y-1/2 bg-black dark:bg-white"
					style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
				/>
				<button
					type="button"
					role="slider"
					data-testid="range-handle-min"
					aria-label="Valor mínimo"
					aria-valuemin={boundMin}
					aria-valuemax={maxValue}
					aria-valuenow={minValue}
					tabIndex={0}
					onPointerDown={(event) => {
						event.preventDefault();
						startDragging("min");
					}}
					onKeyDown={handleKeyDown("min")}
					className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 touch-none bg-black transition-transform hover:scale-150 focus-visible:scale-150 focus-visible:outline-none dark:bg-white ${
						dragging === "min" ? "cursor-grabbing scale-150" : "cursor-grab"
					}`}
					style={{ left: `${minPercent}%` }}
				/>
				<button
					type="button"
					role="slider"
					data-testid="range-handle-max"
					aria-label="Valor máximo"
					aria-valuemin={minValue}
					aria-valuemax={boundMax}
					aria-valuenow={maxValue}
					tabIndex={0}
					onPointerDown={(event) => {
						event.preventDefault();
						startDragging("max");
					}}
					onKeyDown={handleKeyDown("max")}
					className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 touch-none bg-black transition-transform hover:scale-150 focus-visible:scale-150 focus-visible:outline-none dark:bg-white ${
						dragging === "max" ? "cursor-grabbing scale-150" : "cursor-grab"
					}`}
					style={{ left: `${maxPercent}%` }}
				/>
			</div>
			<div className="mt-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-gray-800 dark:text-gray-100">
				{editing === "min" ? (
					<input
						ref={editInputRef}
						data-testid="range-input-min"
						type="text"
						inputMode="decimal"
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						onBlur={commitEdit}
						onKeyDown={(event) => {
							if (event.key === "Enter") commitEdit();
							if (event.key === "Escape") cancelEditing();
						}}
						className="w-20 border-b border-gray-800 bg-transparent outline-none dark:border-gray-100"
					/>
				) : (
					<button
						type="button"
						data-testid="range-label-min"
						onClick={() => startEditing("min")}
					>
						From {minValueLabel}
					</button>
				)}
				{editing === "max" ? (
					<input
						ref={editInputRef}
						data-testid="range-input-max"
						type="text"
						inputMode="decimal"
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						onBlur={commitEdit}
						onKeyDown={(event) => {
							if (event.key === "Enter") commitEdit();
							if (event.key === "Escape") cancelEditing();
						}}
						className="w-20 border-b border-gray-800 bg-transparent text-right outline-none dark:border-gray-100"
					/>
				) : (
					<button
						type="button"
						data-testid="range-label-max"
						onClick={() => startEditing("max")}
					>
						To {maxValueLabel}
					</button>
				)}
			</div>
		</div>
	);
}
