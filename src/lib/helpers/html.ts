import sanitizeHtml from "sanitize-html";
export function processRecipeHtml(fullHtml: string): string {
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
      "HTML is too long, truncating from the bottom (keeping top content)",
    );

    // Keep the START of the document since recipes may be at the top
    return condensedHtml.substring(0, maxLength) + "...";
  }

  return condensedHtml;
}
