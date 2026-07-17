import { NextResponse } from "next/server";

import type { ExerciseTwoResponse } from "@/app/api/types";

export async function GET() {
	return NextResponse.json<ExerciseTwoResponse>({
		rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
	});
}
