import { getSource } from "@/lib/db/sources";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const { sourceId } = await params;
  const source = await getSource(sourceId);

  const url = source?.url;

  if (!url) {
    return NextResponse.json({ error: "Source not found" }, { status: 404 });
  }

  const response = await fetch(url);

  const html = await response.text();

  return NextResponse.json({ html });
}
