import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(request) {
  if (request.auth) return NextResponse.json(request.auth);
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});
