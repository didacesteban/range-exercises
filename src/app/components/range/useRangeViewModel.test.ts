import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRangeViewModel } from "@/app/components/range/useRangeViewModel";

function keyEvent(key: string) {
	return { key, preventDefault: () => {} } as unknown as React.KeyboardEvent;
}

function setTrackRect(
	trackRef: { current: HTMLDivElement | null },
	rect: { left: number; width: number },
) {
	const el = document.createElement("div");
	el.getBoundingClientRect = () =>
		({
			...rect,
			top: 0,
			right: 0,
			bottom: 0,
			height: 0,
			x: rect.left,
			y: 0,
		}) as DOMRect;
	trackRef.current = el;
}

function pointerMove(clientX: number) {
	const event = new Event("pointermove") as unknown as PointerEvent;
	Object.defineProperty(event, "clientX", { value: clientX });
	act(() => window.dispatchEvent(event));
}

function pointerUp() {
	act(() => window.dispatchEvent(new Event("pointerup")));
}

describe("useRangeViewModel - continuous mode", () => {
	it("defaults to the min/max bounds when no default values are given", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({ min: 1, max: 100 }),
		);
		expect(result.current.minValue).toBe(1);
		expect(result.current.maxValue).toBe(100);
		expect(result.current.minPercent).toBe(0);
		expect(result.current.maxPercent).toBe(100);
	});

	it("honors defaultMinValue/defaultMaxValue", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({
				min: 0,
				max: 100,
				defaultMinValue: 20,
				defaultMaxValue: 80,
			}),
		);
		expect(result.current.minValue).toBe(20);
		expect(result.current.maxValue).toBe(80);
		expect(result.current.minPercent).toBe(20);
		expect(result.current.maxPercent).toBe(80);
	});

	it("nudges the min handle with the arrow keys, clamped to the max handle", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({
				min: 0,
				max: 10,
				defaultMinValue: 9,
				defaultMaxValue: 9,
			}),
		);
		act(() => result.current.handleKeyDown("min")(keyEvent("ArrowRight")));
		expect(result.current.minValue).toBe(9);

		act(() => result.current.handleKeyDown("min")(keyEvent("ArrowLeft")));
		expect(result.current.minValue).toBe(8);
	});

	it("Home/End move a handle to its bound or to the other handle", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({
				min: 0,
				max: 100,
				defaultMinValue: 40,
				defaultMaxValue: 60,
			}),
		);
		act(() => result.current.handleKeyDown("max")(keyEvent("Home")));
		expect(result.current.maxValue).toBe(40);

		act(() => result.current.handleKeyDown("min")(keyEvent("End")));
		expect(result.current.minValue).toBe(40);
	});

	it("commits a typed value, clamped within bounds", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({ min: 0, max: 100 }),
		);
		act(() => result.current.startEditing("min"));
		expect(result.current.editing).toBe("min");
		expect(result.current.draft).toBe("0");

		act(() => result.current.setDraft("150"));
		act(() => result.current.commitEdit());
		expect(result.current.minValue).toBe(100);
		expect(result.current.editing).toBeNull();
	});

	it("cancelling an edit leaves the value untouched", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({ min: 0, max: 100, defaultMinValue: 30 }),
		);
		act(() => result.current.startEditing("min"));
		act(() => result.current.setDraft("99"));
		act(() => result.current.cancelEditing());
		expect(result.current.editing).toBeNull();
		expect(result.current.minValue).toBe(30);
	});

	it("dragging the min handle updates its value from pointer position, without crossing the max handle", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({ min: 0, max: 100 }),
		);
		setTrackRect(result.current.trackRef, { left: 0, width: 100 });

		act(() => result.current.startDragging("min"));
		expect(document.body.style.cursor).toBe("grabbing");

		pointerMove(50);
		expect(result.current.minValue).toBe(50);

		pointerMove(100);
		expect(result.current.maxValue).toBe(100);

		pointerUp();
		expect(document.body.style.cursor).toBe("");
		expect(result.current.dragging).toBeNull();
	});
});

describe("useRangeViewModel - discrete mode (values)", () => {
	const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

	it("bounds and defaults snap to the first/last provided values", () => {
		const { result } = renderHook(() => useRangeViewModel({ values }));
		expect(result.current.minValue).toBe(1.99);
		expect(result.current.maxValue).toBe(70.99);
		expect(result.current.minPercent).toBe(0);
		expect(result.current.maxPercent).toBe(100);
	});

	it("nudging the min handle moves to the neighboring provided value", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({
				values,
				defaultMinValue: 5.99,
				defaultMaxValue: 30.99,
			}),
		);
		act(() => result.current.handleKeyDown("min")(keyEvent("ArrowRight")));
		expect(result.current.minValue).toBe(10.99);
	});

	it("committing a typed value snaps to the closest provided value", () => {
		const { result } = renderHook(() =>
			useRangeViewModel({
				values,
				defaultMinValue: 1.99,
				defaultMaxValue: 70.99,
			}),
		);
		act(() => result.current.startEditing("max"));
		act(() => result.current.setDraft("45"));
		act(() => result.current.commitEdit());
		// 45 is closer to 50.99 (diff 5.99) than to 30.99 (diff 14.01)
		expect(result.current.maxValue).toBe(50.99);
	});

	it("dragging snaps to the nearest provided value and cannot cross the other handle", () => {
		const { result } = renderHook(() => useRangeViewModel({ values }));
		setTrackRect(result.current.trackRef, { left: 0, width: 100 });

		act(() => result.current.startDragging("max"));
		// Dragging the max handle far to the left clamps it at the min handle's value.
		pointerMove(0);
		expect(result.current.maxValue).toBe(1.99);
	});
});
