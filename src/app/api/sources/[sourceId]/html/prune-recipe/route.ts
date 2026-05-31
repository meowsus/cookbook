import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import ollama from "ollama";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { findSourceByUser, updateSourceByUser } from "@/lib/db/sources";
import { assignBlockIds, simplifyDom } from "@/lib/helpers/dom";
import { parseLLMJson } from "@/lib/helpers/json";
import { PRUNE_HTML_SYSTEM_PROMPT } from "@/lib/helpers/prompts";
import { ApiError, ApiErrorCode } from "@/types";
import { NextAuthRequest } from "next-auth";
import {
  GetParamsSchema,
  GetParamsType,
  GetResponseData,
} from "./route.schema";

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

  const fullHtml = source.fullHtml;
  if (!fullHtml) {
    return NextResponse.json(
      { message: "Full HTML not available", code: ApiErrorCode.BAD_REQUEST },
      { status: 400 },
    );
  }

  // 1. Initialize DOM and assign block IDs
  const dom = new JSDOM(fullHtml);
  const document = dom.window.document;
  assignBlockIds(document);

  // 2. Simplify DOM to create a "Map" for the LLM
  const mapHtml = simplifyDom(document);

  // 3. Call LLM to identify relevant block IDs
  const result = await ollama.generate({
    model: process.env.OLLAMA_MODEL || "mistral",
    system: PRUNE_HTML_SYSTEM_PROMPT,
    prompt: mapHtml,
    keep_alive: "15m",
    format: "json",
  });

  let blockIds: string[] = [];
  try {
    const parsedResponse = parseLLMJson<unknown>(result.response);
    if (Array.isArray(parsedResponse)) {
      blockIds = parsedResponse as string[];
    } else if (typeof parsedResponse === "object" && parsedResponse !== null) {
      // Handle case where LLM wraps array in an object, e.g. { "ids": [...] }
      const potentialArray = Object.values(parsedResponse).find((val) =>
        Array.isArray(val),
      );
      if (potentialArray) {
        blockIds = potentialArray as string[];
      }
    }
  } catch {
    console.error(
      "Failed to parse block IDs from LLM response:",
      result.response,
    );
    return NextResponse.json(
      {
        message: "Failed to parse pruning IDs",
        code: ApiErrorCode.INTERNAL_SERVER_ERROR,
      },
      { status: 500 },
    );
  }

  if (blockIds.length === 0) {
    return NextResponse.json(
      {
        message: "No relevant blocks identified",
        code: ApiErrorCode.INTERNAL_SERVER_ERROR,
      },
      { status: 500 },
    );
  }

  // 4. Retrieve original HTML for those specific IDs
  const concentratedHtmlBlocks: string[] = [];
  blockIds.forEach((id) => {
    const element = document.querySelector(`[data-block-id="${id}"]`);
    if (element) {
      concentratedHtmlBlocks.push(element.outerHTML);
    }
  });

  const concentratedHtml = concentratedHtmlBlocks.join("\n\n");

  // 5. Save this "Concentrated HTML" into source.processedHtml
  await updateSourceByUser(request.auth.user.id, sourceId, {
    processedHtml: concentratedHtml,
  });

  return NextResponse.json({
    text: "Recipe content concentrated successfully",
  });
});
