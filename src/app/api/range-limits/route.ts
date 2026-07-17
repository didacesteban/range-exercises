import { NextResponse } from "next/server";

import type { RangeLimitsResponse } from "@/app/api/types";

export async function GET() {
	return NextResponse.json<RangeLimitsResponse>({ min: 1, max: 100 });
}
