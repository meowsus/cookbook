import { getSource } from "@/lib/db/sources";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  sourceId: z.string().nonempty(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const parsedParams = schema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      {
        validation: z.treeifyError(parsedParams.error),
      },
      {
        status: 400,
      },
    );
  }

  const { sourceId } = parsedParams.data;

  const source = await getSource(sourceId);

  if (!source) {
    return NextResponse.json({ message: "Source not found" }, { status: 404 });
  }

  const response = await fetch(source.url);
  const fullHtml = await response.text();

  return NextResponse.json({ fullHtml });
}
