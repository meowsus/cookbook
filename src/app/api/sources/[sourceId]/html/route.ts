import { getSource } from "@/lib/db/sources";
import { ApiErrorCode, ApiResponse } from "@/types";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GetParamsSchema = z.object({
  sourceId: z.string().nonempty(),
});

export interface GetResponseData {
  html: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
): Promise<NextResponse<ApiResponse<GetResponseData>>> {
  const parsedParams = GetParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      {
        message: "Validation Error",
        code: ApiErrorCode.VALIDATION_ERROR,
        validation: z.flattenError(parsedParams.error).fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  const { sourceId } = parsedParams.data;

  const source = await getSource(sourceId);

  if (!source) {
    return NextResponse.json(
      { message: "Source not found", code: ApiErrorCode.NOT_FOUND },
      { status: 404 },
    );
  }

  const response = await fetch(source.url);
  const html = await response.text();

  return NextResponse.json({ html });
}
