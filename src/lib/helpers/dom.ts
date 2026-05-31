export interface SimplifyDomOptions {
  keepAttributes?: string[];
  removeElements?: string[];
}

/**
 * Assigns unique data-block-ids to meaningful blocks in the DOM.
 *
 * @param document The JSDOM document.
 */
export function assignBlockIds(document: Document): void {
  const blockSelectors =
    "div, section, article, main, aside, p, ul, ol, table, h1, h2, h3, h4, h5, h6";
  const blocks = document.querySelectorAll(blockSelectors);
  blocks.forEach((el, index) => {
    el.setAttribute("data-block-id", `idx-${index}`);
  });
}

/**
 * Simplifies HTML for LLM processing by removing noise and reducing structure complexity.
 * Note: This function now accepts a Document to facilitate ID assignment and retrieval.
 *
 * @param document The JSDOM document.
 * @param options Customization options.
 * @returns The simplified HTML string.
 */
export function simplifyDom(
  document: Document,
  options: SimplifyDomOptions = {},
): string {
  const {
    keepAttributes = ["id", "class", "data-block-id"],
    removeElements = ["script", "style", "nav", "footer"],
  } = options;

  // Clone the document to avoid mutating the original one used for extraction
  const clone = document.cloneNode(true) as Document;

  // 1. Remove unwanted elements
  removeElements.forEach((selector) => {
    clone.querySelectorAll(selector).forEach((el) => el.remove());
  });

  // 2. Remove unwanted attributes
  const allElements = clone.querySelectorAll("*");
  allElements.forEach((el) => {
    const attrs = Array.from(el.attributes);
    attrs.forEach((attr) => {
      if (!keepAttributes.includes(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });

  // 3. Collapse deeply nested divs that only have one child
  let changed = true;
  while (changed) {
    changed = false;
    const divs = clone.querySelectorAll("div");
    divs.forEach((div) => {
      if (div.children.length === 1 && div.childNodes.length === 1) {
        const child = div.children[0];
        if (child.tagName === "DIV") {
          const parent = div.parentNode;
          if (parent) {
            parent.replaceChild(child, div);
            changed = true;
          }
        }
      }
    });
  }

  return clone.body ? clone.body.innerHTML : "";
}
