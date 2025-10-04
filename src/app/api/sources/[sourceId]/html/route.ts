import { auth } from "@/lib/auth";
import { findSourceByUser } from "@/lib/db/sources";
import { ApiErrorCode, ApiError } from "@/types";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";
import {
  GetParamsSchema,
  GetParamsType,
  GetResponseData,
} from "./route.schema";
import { z } from "zod";

export const GET = auth(async function GET(
  request: NextAuthRequest,
  { params }: { params: Promise<GetParamsType> },
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

  const response = await fetch(source.url);
  const html = await response.text();

  return NextResponse.json({ html });
});
