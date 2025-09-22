import { z } from "zod";

export const CreateSourceSchema = z.object({
  url: z.url("A valid URL is required").nonempty(),
});

export const UpdateSourceFullHtmlSchema = z.object({
  sourceId: z.string().nonempty(),
  fullHtml: z.string().nonempty(),
});

export const RemoveSourceFullHtmlSchema = z.object({
  sourceId: z.string().nonempty(),
});

export const UpdateSourceProcessedHtmlSchema = z.object({
  sourceId: z.string().nonempty(),
  processedHtml: z.string().nonempty(),
});

export const RemoveSourceProcessedHtmlSchema = z.object({
  sourceId: z.string().nonempty(),
});

export const UpdateExtractedRecipeSchema = z.object({
  sourceId: z.string().nonempty(),
  extractedRecipe: z.string().nonempty(),
});

export const RemoveExtractedRecipeSchema = z.object({
  sourceId: z.string().nonempty(),
});

export const DeleteSourceSchema = z.object({
  sourceId: z.string().nonempty(),
});
