import { NextResponse } from "next/server";
import ollama from "ollama";
import { z } from "zod";

import {
  GetParamsSchema,
  GetParamsType,
  GetResponseDataSchema,
  GetResponseDataType,
} from "@/app/api/sources/[sourceId]/create-recipe/route.schema";
import { auth } from "@/lib/auth";
import { findSourceByUser } from "@/lib/db/sources";
import { CREATE_RECIPE_SYSTEM_PROMPT } from "@/lib/helpers/prompts";
import { ApiError, ApiErrorCode } from "@/types";
import { NextAuthRequest } from "next-auth";

export const GET = auth(async function GET(
  request: NextAuthRequest,
  { params }: { params: Promise<{ sourceId: string }> },
): Promise<NextResponse<GetResponseDataType | ApiError<GetParamsType>>> {
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
    system: CREATE_RECIPE_SYSTEM_PROMPT,
    prompt: source.extractedRecipe,
    keep_alive: "15m",
    format: "json",
  });

  console.log(result);

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(result.response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Invalid response", code: ApiErrorCode.INVALID_RESPONSE },
      { status: 400 },
    );
  }

  const parsedResult = GetResponseDataSchema.safeParse(parsedResponse);

  if (!parsedResult.success) {
    return NextResponse.json(
      { message: "Invalid response", code: ApiErrorCode.INVALID_RESPONSE },
      { status: 400 },
    );
  }

  return NextResponse.json(parsedResult.data);
});
