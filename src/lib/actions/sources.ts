"use server";

import { createSource, deleteSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { z } from "zod";

const createSourceFormDataSchema = z.object({
  url: z.string(),
});

export async function createSourceAction(formData: FormData) {
  const parsedFormData = createSourceFormDataSchema.safeParse({
    url: formData.get("url"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { url } = parsedFormData.data;

  await createSource(url);

  void redirect("/sources");
}

const updateSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string(),
  fullHtml: z.string(),
});

export async function updateSourceFullHtmlAction(formData: FormData) {
  const parsedFormData = updateSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    fullHtml: formData.get("fullHtml"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId, fullHtml } = parsedFormData.data;

  await updateSource(sourceId, {
    fullHtml,
    processedHtml: "",
    extractedRecipe: "",
  });

  void redirect(`/sources/${sourceId}`);
}

const removeSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string(),
});

export async function removeSourceFullHtmlAction(formData: FormData) {
  const parsedFormData = removeSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, {
    fullHtml: "",
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const updateSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string(),
  processedHtml: z.string(),
});

export async function updateSourceProcessedHtmlAction(formData: FormData) {
  const parsedFormData = updateSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    processedHtml: formData.get("processedHtml"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId, processedHtml } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml,
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const removeSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string(),
});

export async function removeSourceProcessedHtmlAction(formData: FormData) {
  const parsedFormData = removeSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const updateExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string(),
  extractedRecipe: z.string(),
});

export async function updateExtractedRecipeAction(formData: FormData) {
  const parsedFormData = updateExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    extractedRecipe: formData.get("extractedRecipe"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId, extractedRecipe } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe });

  redirect(`/sources/${sourceId}`);
}

const removeExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string(),
});

export async function removeExtractedRecipeAction(formData: FormData) {
  const parsedFormData = removeExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe: "" });

  redirect(`/sources/${sourceId}`);
}

const deleteSourceFormDataSchema = z.object({
  sourceId: z.string(),
});

export async function deleteSourceAction(formData: FormData) {
  const parsedFormData = deleteSourceFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    throw new Error("Invalid form data");
  }

  const { sourceId } = parsedFormData.data;

  await deleteSource(sourceId);

  void redirect("/sources");
}
