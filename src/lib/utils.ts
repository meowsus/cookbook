import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitizeHtml from "sanitize-html";

// HTML Helpers

const MAIN_CONTENT_REGEX =
  /<(main|article|div[^>]*class="[^"]*recipe[^"]*")[^>]*>([\s\S]*?)<\/\1>/gi;

const ALLOWED_TAGS = [
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
];

function removeNonContentTags(html: string): string {
  return html
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "");
}

function determineMainRecipeContent(html: string): string {
  const matches = html.match(MAIN_CONTENT_REGEX);

  if (matches && matches.length > 0) {
    return matches.join(" ");
  } else {
    return removeNonContentTags(html);
  }
}

export function condenseHtml(html: string): string {
  // Reduce all whitespace (including newlines, tabs, spaces) between tags to nothing
  return html.replace(/>\s+</g, ">\n<").replace(/\s+\n/g, "\n").trim();
}

export function processRecipeHtml(fullHtml: string): string {
  const recipeHtml = determineMainRecipeContent(fullHtml);

  const sanitizedHtml = sanitizeHtml(recipeHtml, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {},
    allowedSchemes: [],
    allowedSchemesAppliedToAttributes: [],
  });

  return condenseHtml(sanitizedHtml);
}

// Added by shadcn

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
