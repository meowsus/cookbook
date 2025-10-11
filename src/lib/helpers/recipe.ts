export function createDefaultRecipeName(content: string | null) {
  if (!content) return "";

  // This is a temporary measure until we improve the LLM output to
  // include a seprate name value.
  return content.substring(2, content.indexOf("\n"));
}
