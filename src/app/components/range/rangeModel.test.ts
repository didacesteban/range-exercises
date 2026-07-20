import { describe, expect, it } from "vitest";
import {
	clamp,
	createRangeModel,
	nearestPoint,
	resolveHandleValue,
	stepPoint,
} from "@/app/components/range/rangeModel";

describe("createRangeModel", () => {
	it("uses min/max as bounds when no discrete values are given", () => {
		const model = createRangeModel({ min: 0, max: 100 });
		expect(model.points).toBeNull();
		expect(model.boundMin).toBe(0);
		expect(model.boundMax).toBe(100);
	});

	it("derives sorted bounds from discrete values", () => {
		const model = createRangeModel({ values: [30.99, 1.99, 10.99] });
		expect(model.points).toEqual([1.99, 10.99, 30.99]);
		expect(model.boundMin).toBe(1.99);
		expect(model.boundMax).toBe(30.99);
	});
});

describe("clamp", () => {
	it("keeps the value within bounds", () => {
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(15, 0, 10)).toBe(10);
	});
});

describe("nearestPoint", () => {
	it("returns the closest provided point", () => {
		expect(nearestPoint(45, [1.99, 30.99, 50.99, 70.99])).toBe(50.99);
	});
});

describe("stepPoint", () => {
	it("moves to the neighboring point, clamped at the array bounds", () => {
		const points = [1.99, 10.99, 30.99];
		expect(stepPoint(points, 10.99, 1)).toBe(30.99);
		expect(stepPoint(points, 1.99, -1)).toBe(1.99);
	});
});

describe("resolveHandleValue", () => {
	it("clamps a continuous min handle against the other handle's value", () => {
		const model = createRangeModel({ min: 0, max: 100 });
		expect(resolveHandleValue(model, "min", 150, 80)).toBe(80);
		expect(resolveHandleValue(model, "min", -20, 80)).toBe(0);
	});

	it("clamps a continuous max handle against the other handle's value", () => {
		const model = createRangeModel({ min: 0, max: 100 });
		expect(resolveHandleValue(model, "max", -20, 20)).toBe(20);
		expect(resolveHandleValue(model, "max", 150, 20)).toBe(100);
	});

	it("snaps a discrete handle to the nearest point, clamped against the other handle", () => {
		const model = createRangeModel({ values: [1.99, 10.99, 30.99, 50.99] });
		expect(resolveHandleValue(model, "max", 45, 10.99)).toBe(50.99);
		expect(resolveHandleValue(model, "min", 45, 10.99)).toBe(10.99);
	});
});
