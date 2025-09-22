import { auth } from "@/lib/auth";
import { findSourceByUser } from "@/lib/db/sources";
import { ApiErrorCode, ApiError } from "@/types";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GetParamsSchema = z.object({
  sourceId: z.string().nonempty(),
});

export type GetParamsType = z.infer<typeof GetParamsSchema>;

export interface GetResponseData {
  html: string;
}

export const GET = auth(async function GET(
  request: NextAuthRequest,
  { params }: { params: Promise<{ sourceId: string }> },
): Promise<NextResponse<GetResponseData | ApiError<GetParamsType>>> {
  if (!request.auth?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized", code: ApiErrorCode.UNAUTHORIZED },
      { status: 401 },
    );
  }

  const parsedParams = GetParamsSchema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      {
        message: "Validation Error",
        code: ApiErrorCode.VALIDATION_ERROR,
        validation: z.flattenError(parsedParams.error),
      },
      {
        status: 400,
      },
    );
  }

  const { sourceId } = parsedParams.data;

  const source = await findSourceByUser(request.auth.user.id, sourceId);

  if (!source) {
    return NextResponse.json(
      { message: "Source not found", code: ApiErrorCode.NOT_FOUND },
      { status: 404 },
    );
  }

  try {
    const response = await fetch(source.url);
    const html = await response.text();

    return NextResponse.json({ html });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch source HTML",
        code: ApiErrorCode.INTERNAL_SERVER_ERROR,
      },
      { status: 500 },
    );
  }
});
