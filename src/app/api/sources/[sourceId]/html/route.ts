import { getSource } from "@/lib/db/sources";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

interface RecipeInstruction {
  text?: string;
}

interface RecipeData {
  "@type": string;
  name?: string;
  recipeIngredient?: string[];
  recipeInstructions?: (string | RecipeInstruction)[];
}

function processRecipeHtml(fullHtml: string): string {
  // Remove non-content sections
  let html = fullHtml
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "");

  // Try to find main content areas
  const mainContentRegex =
    /<(main|article|div[^>]*class="[^"]*recipe[^"]*")[^>]*>([\s\S]*?)<\/\1>/gi;
  const matches = html.match(mainContentRegex);
  if (matches && matches.length > 0) {
    html = matches.join(" ");
  }

  // Aggressive sanitization - keep only essential tags and no attributes
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
    ],
    allowedAttributes: {},
    allowedSchemes: [],
    allowedSchemesAppliedToAttributes: [],
  });

  // Final condensing
  const condensedHtml = cleanHtml
    .replace(/\n/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Limit size to prevent token overflow (adjust as needed)
  const maxLength = 15000;

  if (condensedHtml.length > maxLength) {
    console.warn(
      "HTML is too long, truncating from the top (keeping bottom content)",
    );

    // Keep the END of the document since recipes are usually at the bottom
    return "..." + condensedHtml.substring(condensedHtml.length - maxLength);
  }

  return condensedHtml;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sourceId: string }> },
) {
  const { sourceId } = await params;
  const source = await getSource(sourceId);

  const url = source?.url;

  if (!url) {
    return NextResponse.json(
      { error: "Source url not found" },
      { status: 404 },
    );
  }

  const response = await fetch(url);
  const fullHtml = await response.text();

  const html = processRecipeHtml(fullHtml);

  return NextResponse.json({ html });
}
