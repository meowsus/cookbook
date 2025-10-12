import ollama from "ollama";
import { NextResponse } from "next/server";
import { z } from "zod";

import { findSourceByUser } from "@/lib/db/sources";
import { ApiError, ApiErrorCode } from "@/types";
import { auth } from "@/lib/auth";
import { NextAuthRequest } from "next-auth";
import {
  GetParamsSchema,
  GetParamsType,
  GetResponseDataSchema,
  GetResponseDataType,
} from "./route.schema";

const SYSTEM_PROMPT = `
You are a recipe extraction bot. You will be given a recipe in Markdown format.

It's your job to respond with JSON, with "name" and "content" properties.

1. Extract the recipe name from the Markdown.
2. Extract the recipe content from the Markdown.
3. Content should be the remainder of the Markdown, excluding the name.

Example output:

{
  "name": "Recipe Name",
  "content": "## Ingredients\n\n- Ingredient 1\n- Ingredient 2\n- etc.\n\n## Steps\n\n1. Step 1\n2. Step 2\n3. etc."
}
`;

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
    system: SYSTEM_PROMPT,
    prompt: `Extract ONLY the recipe JSON from this Markdown (ignore everything else): ${source.extractedRecipe}`,
    keep_alive: "15m",
    format: "json",
  });

  console.log(result);

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(result.response);
  } catch (error) {
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
