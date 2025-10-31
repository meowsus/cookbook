import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export async function markdownToHtml(markdown: string) {
  return DOMPurify.sanitize(await marked.parse(markdown));
}
