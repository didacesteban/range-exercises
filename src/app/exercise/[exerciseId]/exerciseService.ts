import { headers } from "next/headers";

import type { RangeLimitsResponse, RangeValuesResponse } from "@/app/api/types";

async function getBaseUrl() {
	const headersList = await headers();
	const host = headersList.get("host");
	const protocol = host?.startsWith("localhost") ? "http" : "https";
	return `${protocol}://${host}`;
}

export async function getRangeLimits(): Promise<RangeLimitsResponse> {
	const baseUrl = await getBaseUrl();
	const res = await fetch(`${baseUrl}/api/range-limits`, { cache: "no-store" });
	return res.json();
}

export async function getRangeValues(): Promise<RangeValuesResponse> {
	const baseUrl = await getBaseUrl();
	const res = await fetch(`${baseUrl}/api/range-values`, { cache: "no-store" });
	return res.json();
}
