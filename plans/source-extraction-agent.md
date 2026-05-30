# Implementation Plan: Agentic Source Extraction Pipeline

This plan transitions the "Source Extraction" feature from a manual, human-guided process to a fully automated agentic pipeline.

The goal is to replace the **"Step 3: Process HTML"** (manual pruning) with an **LLM-driven Pruning Agent** that identifies the most relevant parts of the page before the final extraction.

## 🛠️ Architecture Overview: The "Concentrator" Pipeline

We will transform the pipeline into a three-stage distillation process:

1. **Simplify:** Convert raw HTML $\to$ a lightweight "Semantic Map" (DOM structure with IDs, no noise).
2. **Prune:** LLM analyzes the Map $\to$ returns only the IDs of the blocks containing the recipe.
3. **Extract:** System retrieves the original HTML for those IDs $\to$ LLM converts that "Concentrate" to Markdown.

---

## 📋 Implementation Plan

### Phase 1: DOM Simplification (The "Map" Generator)

Before an LLM can prune the page, it needs a version of the HTML that doesn't blow out the context window.

- [ ] **Create `src/lib/helpers/dom.ts`**: Implement a `simplifyDom` function that:
  - Strips all `<script>`, `<style>`, `<nav>`, `<footer>`, and `<header>`.
  - Removes all attributes except `id` and `class`.
  - Collapses deeply nested `div`s that only have one child.
  - Assigns a unique `data-block-id` (e.g., `idx-0`, `idx-1`) to every remaining top-level block.
- [ ] **Add unit tests**: Verify that a 100KB HTML file is reduced to <10KB while preserving block IDs.

### Phase 2: The Pruning Agent (The "Concentrator")

Implement the logic that decides _what_ to keep.

- [ ] **Define `PRUNE_HTML_SYSTEM_PROMPT`**: In `src/lib/helpers/prompts.ts`.
  - Instructions: "Analyze the simplified HTML map. Identify the block IDs that contain the recipe title, ingredients, and instructions. Return a JSON list of IDs."
- [ ] **Create `src/app/api/sources/[sourceId]/html/prune-recipe/route.ts`**:
  - Fetch `fullHtml` from DB.
  - Run `simplifyDom`.
  - Call Ollama to get the list of relevant block IDs.
  - Retrieve the _original_ HTML for those specific IDs.
  - Save this "Concentrated HTML" into `source.processedHtml`.

### Phase 3: Extraction Refinement (The "Polisher")

Connect the pruned content to the final Markdown extraction.

- [ ] **Update `src/app/api/sources/[sourceId]/html/extract-recipe/route.ts`**:
  - Ensure it consumes the new `processedHtml` (which is now the Concentrated HTML).
  - (Optional) Tweak the `EXTRACT_RECIPE_SYSTEM_PROMPT` to assume a high-density context.
- [ ] **Verify Grounding**: Ensure the final Markdown output strictly adheres to the text found in the concentrated HTML to prevent hallucinations.

### Phase 4: UI/UX Transformation (Removing the Human)

Convert the manual stepping process into a "Magic" experience.

- [ ] **Delete `src/app/sources/[sourceId]/ProcessHtmlModal.tsx`**: Remove the manual pruning UI.
- [ ] **Update `src/app/sources/[sourceId]/page.tsx`**:
  - Change "Step 3" to be an automated trigger.
  - When "Step 2: Fetch Full HTML" completes, automatically trigger the Pruning API.
- [ ] **Update `SourceSteps.tsx`**:
  - Update the "Process" step to show a loading state (e.g., "Agent is concentrating content...") instead of a button.
- [ ] **Refactor `ExtractRecipeModalContent.tsx`**:
  - Ensure the modal now triggers "Extract" only after the Pruning Agent has finished its job.

### Phase 5: Validation & QA

- [ ] **Regression Testing**: Run the new pipeline against existing sources to ensure Markdown quality hasn't degraded.
- [ ] **Edge Case Testing**: Test against "extremely noisy" websites (e.g., sites with 50+ ads) to verify the Pruning Agent's effectiveness.
- [ ] **Performance Benchmarking**: Measure the reduction in tokens sent to the LLM in the final extraction step.

---

## 📈 Success Metrics

- **Zero Human Intervention:** User provides URL $\to$ waits $\to$ gets a recipe.
- **Context Efficiency:** Final extraction prompt should be significantly smaller (targeting < 4k tokens even for huge pages).
- **Hallucination Reduction:** A measurable decrease in "invented" ingredients compared to the previous "full HTML" approach.
