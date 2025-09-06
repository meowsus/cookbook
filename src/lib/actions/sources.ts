"use server";

import { createSource, deleteSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { z } from "zod";

export const CreateSourceFormDataSchema = z.object({
  url: z.url(),
});

export async function createSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = CreateSourceFormDataSchema.safeParse({
    url: formData.get("url"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { url } = parsedFormData.data;

  await createSource(url);

  void redirect("/sources");
}

export const UpdateSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  fullHtml: z.string().nonempty(),
});

export async function updateSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = UpdateSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    fullHtml: formData.get("fullHtml"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId, fullHtml } = parsedFormData.data;

  await updateSource(sourceId, {
    fullHtml,
    processedHtml: "",
    extractedRecipe: "",
  });

  void redirect(`/sources/${sourceId}`);
}

export const RemoveSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = RemoveSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, {
    fullHtml: "",
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export const UpdateSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  processedHtml: z.string().nonempty(),
});

export async function updateSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = UpdateSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    processedHtml: formData.get("processedHtml"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId, processedHtml } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml,
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export const RemoveSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = RemoveSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, {
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export const UpdateExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  extractedRecipe: z.string().nonempty(),
});

export async function updateSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = UpdateExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    extractedRecipe: formData.get("extractedRecipe"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId, extractedRecipe } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe });

  redirect(`/sources/${sourceId}`);
}

export const RemoveExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = RemoveExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await updateSource(sourceId, { extractedRecipe: "" });

  redirect(`/sources/${sourceId}`);
}

export const DeleteSourceFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function deleteSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const parsedFormData = DeleteSourceFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return z.flattenError(parsedFormData.error);
  }

  const { sourceId } = parsedFormData.data;

  await deleteSource(sourceId);

  void redirect("/sources");
}
