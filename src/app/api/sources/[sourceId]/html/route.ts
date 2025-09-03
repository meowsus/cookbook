import { getSource } from "@/lib/db/sources";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  sourceId: z.string(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const parsedParams = schema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { message: "Invalid request parameters" },
      { status: 400 },
    );
  }

  const { sourceId } = parsedParams.data;

  const source = await getSource(sourceId);

  const url = source?.url;

  if (!url) {
    return NextResponse.json(
      { message: "Source url not found" },
      { status: 404 },
    );
  }

  const response = await fetch(url);

  const fullHtml = await response.text();

  return NextResponse.json({ fullHtml });
}
