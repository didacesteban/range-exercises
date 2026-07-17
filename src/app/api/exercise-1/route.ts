import { NextResponse } from "next/server";

import type { ExerciseOneResponse } from "@/app/api/types";

export async function GET() {
	return NextResponse.json<ExerciseOneResponse>({ min: 1, max: 100 });
}
