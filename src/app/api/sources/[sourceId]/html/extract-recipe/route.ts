import { NextResponse } from "next/server";
import ollama from "ollama";
import { z } from "zod";

import {
  GetParamsSchema,
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/extract-recipe/route.schema";
import { auth } from "@/lib/auth";
import { findSourceByUser } from "@/lib/db/sources";
import { EXTRACT_RECIPE_SYSTEM_PROMPT } from "@/lib/helpers/prompts";
import { ApiError, ApiErrorCode } from "@/types";
import { NextAuthRequest } from "next-auth";

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
      { status: 400 },
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

  const result = await ollama.generate({
    model: process.env.OLLAMA_MODEL || "mistral",
    system: EXTRACT_RECIPE_SYSTEM_PROMPT,
    prompt: `Extract ONLY the recipe from this HTML (ignore everything else): ${source.processedHtml}`,
    keep_alive: "15m",
  });

  console.log(result);

  return NextResponse.json({ text: result.response });
});
