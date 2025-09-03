"use server";

import { createSource, deleteSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { z } from "zod";

const createSourceFormDataSchema = z.object({
  url: z.url(),
});

export async function createSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = createSourceFormDataSchema.safeParse({
    url: formData.get("url"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { url } = parsedFormData.data;

  await createSource(url);

  void redirect("/sources");
}

const updateSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  fullHtml: z.string().nonempty(),
});

export async function updateSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = updateSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    fullHtml: formData.get("fullHtml"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
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
  sourceId: z.string().nonempty(),
});

export async function removeSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = removeSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
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
  sourceId: z.string().nonempty(),
  processedHtml: z.string().nonempty(),
});

export async function updateSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = updateSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    processedHtml: formData.get("processedHtml"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { sourceId, processedHtml } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml,
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const removeSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = removeSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const updateExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  extractedRecipe: z.string().nonempty(),
});

export async function updateSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = updateExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    extractedRecipe: formData.get("extractedRecipe"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { sourceId, extractedRecipe } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe });

  redirect(`/sources/${sourceId}`);
}

const removeExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = removeExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe: "" });

  redirect(`/sources/${sourceId}`);
}

const deleteSourceFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function deleteSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = deleteSourceFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.treeifyError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await deleteSource(sourceId);

  void redirect("/sources");
}
