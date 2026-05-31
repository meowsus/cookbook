/**
 * Parses a JSON string that may be wrapped in Markdown code fences,
 * contain conversational filler, or use invalid single quotes.
 *
 * @param text The raw response text from the LLM.
 * @returns The parsed JSON object.
 * @throws Error if the text cannot be parsed as JSON.
 */
export function parseLLMJson<T>(text: string): T {
  let cleanJson = text.trim();

  // 1. Extract content from Markdown code fences (```json ... ```)
  const jsonMatch = cleanJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    cleanJson = jsonMatch[1].trim();
  } else {
    // 2. Boundary detection: Remove conversational preamble and postamble
    const firstBrace = cleanJson.indexOf("{");
    const firstBracket = cleanJson.indexOf("[");

    let startIdx = -1;
    if (firstBrace !== -1 && firstBracket !== -1)
      startIdx = Math.min(firstBrace, firstBracket);
    else if (firstBrace !== -1) startIdx = firstBrace;
    else if (firstBracket !== -1) startIdx = firstBracket;

    if (startIdx !== -1) {
      const lastBrace = cleanJson.lastIndexOf("}");
      const lastBracket = cleanJson.lastIndexOf("]");
      const endIdx = Math.max(lastBrace, lastBracket);
      if (endIdx !== -1) {
        cleanJson = cleanJson.substring(startIdx, endIdx + 1);
      }
    }
  }

  // 3. Remove hidden control characters and BOMs that can confuse JSON.parse at position 1
  // This targets non-printable characters while preserving standard whitespace
  cleanJson = cleanJson.replace(/^[\uFEFF\x00-\x1F\x7F-\x9F]+/, "");

  // 4. Fix "Bad control character in string literal"
  // We escape actual newlines/tabs inside the JSON to avoid "Bad control character" errors.
  cleanJson = cleanJson.replace(/[\x00-\x1f]/g, (match) => {
    if (match === "\n") return "\\n";
    if (match === "\r") return "\\r";
    if (match === "\t") return "\\t";
    return "";
  });

  try {
    return JSON.parse(cleanJson) as T;
  } catch (e) {
    // 5. Final Fallback: Heuristic quote repair for single-quoted JSON
    try {
      // Only attempt this if the first character is { and the second is not "
      if (cleanJson.startsWith("{") && cleanJson[1] !== '"') {
        const fixedQuotes = cleanJson
          .replace(/'([^']*)'/g, '"$1"')
          .replace(/"{/, "{");
        return JSON.parse(fixedQuotes) as T;
      }
      throw e;
    } catch (e) {
      throw e;
    }
  }
}
