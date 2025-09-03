import ollama from "ollama";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getSource } from "@/lib/db/sources";

const schema = z.object({
  sourceId: z.string().nonempty(),
});

const SYSTEM_PROMPT = `
You are a recipe extraction bot. You MUST follow these rules strictly:

1. ONLY extract recipe information from the HTML
2. IGNORE all other content (navigation, comments, ads, etc.)
3. Return ONLY the recipe in this EXACT markdown format:

# Recipe Name

## Ingredients

- Ingredient 1
- Ingredient 2
- etc.

## Steps

1. Step 1
2. Step 2
3. etc.

CRITICAL: Do not provide explanations, summaries, or any other text. Return ONLY the recipe in the format above.
`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const parsedParams = schema.safeParse(await params);

  if (!parsedParams.success) {
    return NextResponse.json(
      { validation: z.treeifyError(parsedParams.error) },
      { status: 400 },
    );
  }

  const { sourceId } = parsedParams.data;
  const source = await getSource(sourceId);

  if (!source) {
    return NextResponse.json({ message: "Source not found" }, { status: 404 });
  }

  const result = await ollama.generate({
    model: process.env.OLLAMA_MODEL || "mistral",
    system: SYSTEM_PROMPT,
    prompt: `Extract ONLY the recipe from this HTML (ignore everything else): ${source.processedHtml}`,
    keep_alive: "15m",
  });

  console.log(result);

  return NextResponse.json({ text: result.response });
}
