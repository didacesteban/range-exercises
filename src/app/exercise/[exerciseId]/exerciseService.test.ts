import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/getBaseUrl", () => ({
	getBaseUrl: () => Promise.resolve("http://localhost:8080"),
}));

import {
	getRangeLimits,
	getRangeValues,
} from "@/app/exercise/[exerciseId]/exerciseService";

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("exerciseService", () => {
	it("getRangeLimits fetches /api/range-limits and returns the parsed body", async () => {
		const json = vi.fn().mockResolvedValue({ min: 1, max: 100 });
		const fetchMock = vi.fn().mockResolvedValue({ json });
		vi.stubGlobal("fetch", fetchMock);

		const result = await getRangeLimits();

		expect(fetchMock).toHaveBeenCalledWith(
			"http://localhost:8080/api/range-limits",
			{ cache: "no-store" },
		);
		expect(result).toEqual({ min: 1, max: 100 });
	});

	it("getRangeValues fetches /api/range-values and returns the parsed body", async () => {
		const json = vi.fn().mockResolvedValue({ rangeValues: [1.99, 5.99] });
		const fetchMock = vi.fn().mockResolvedValue({ json });
		vi.stubGlobal("fetch", fetchMock);

		const result = await getRangeValues();

		expect(fetchMock).toHaveBeenCalledWith(
			"http://localhost:8080/api/range-values",
			{ cache: "no-store" },
		);
		expect(result).toEqual({ rangeValues: [1.99, 5.99] });
	});
});
