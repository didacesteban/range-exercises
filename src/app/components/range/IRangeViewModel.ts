import type { RefObject } from "react";

export type RangeHandle = "min" | "max";

export interface IRangeViewModelParams {
	min?: number;
	max?: number;
	step?: number;
	values?: number[];
	defaultMinValue?: number;
	defaultMaxValue?: number;
}

export interface IRangeViewModel {
	trackRef: RefObject<HTMLDivElement | null>;
	editInputRef: RefObject<HTMLInputElement | null>;
	boundMin: number;
	boundMax: number;
	minValue: number;
	maxValue: number;
	minValueLabel: string;
	maxValueLabel: string;
	minPercent: number;
	maxPercent: number;
	dragging: RangeHandle | null;
	editing: RangeHandle | null;
	draft: string;
	setDraft: (value: string) => void;
	startDragging: (handle: RangeHandle | null) => void;
	handleKeyDown: (handle: RangeHandle) => (event: React.KeyboardEvent) => void;
	startEditing: (handle: RangeHandle) => void;
	cancelEditing: () => void;
	commitEdit: () => void;
}
