import { describe, expect, it, vi } from "vitest";

import { getBaseUrl } from "@/lib/getBaseUrl";

const headersMock = vi.fn();

vi.mock("next/headers", () => ({
	headers: () => headersMock(),
}));

function mockHost(host: string | null) {
	headersMock.mockResolvedValue({ get: () => host });
}

describe("getBaseUrl", () => {
	it("uses http for a localhost host", async () => {
		mockHost("localhost:8080");
		await expect(getBaseUrl()).resolves.toBe("http://localhost:8080");
	});

	it("uses https for a non-localhost host", async () => {
		mockHost("example.com");
		await expect(getBaseUrl()).resolves.toBe("https://example.com");
	});

	it("falls back to https when the host header is missing", async () => {
		mockHost(null);
		await expect(getBaseUrl()).resolves.toBe("https://null");
	});
});
