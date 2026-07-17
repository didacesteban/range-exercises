import type { RangeLimitsResponse, RangeValuesResponse } from "@/app/api/types";
import { getBaseUrl } from "@/lib/getBaseUrl";

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
