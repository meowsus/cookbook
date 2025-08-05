import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";
import { NextResponse } from "next/server";

import { getSource } from "@/lib/db/sources";

const ollama = createOllama();

const SYSTEM_PROMPT = `
You are a recipe extraction bot. You MUST follow these rules strictly:

1. ONLY extract recipe information from the HTML
2. IGNORE all other content (navigation, comments, ads, etc.)
3. Return ONLY the recipe in this EXACT format:

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
  const { sourceId } = await params;
  const source = await getSource(sourceId);

  const html = source?.processedHtml;

  if (!html) {
    return NextResponse.json(
      { error: "Source html not found" },
      { status: 404 },
    );
  }

  const result = await generateText({
    model: ollama("gemma3"),
    system: SYSTEM_PROMPT,
    prompt: `Extract ONLY the recipe from this HTML (ignore everything else): ${html}`,
    temperature: 0.3,
  });

  console.log(result);

  return NextResponse.json({ text: result.text });
}
