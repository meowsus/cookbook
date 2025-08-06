"use server";

import { createSource, deleteSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";

export async function createSourceAction(formData: FormData) {
  const url = formData.get("url") as string;

  await createSource(url);

  redirect("/sources");
}

export async function updateSourceFullHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const fullHtml = formData.get("fullHtml") as string;

  await updateSource(sourceId, {
    fullHtml,
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export async function removeSourceFullHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;

  await updateSource(sourceId, {
    fullHtml: "",
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export async function updateSourceProcessedHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const processedHtml = formData.get("processedHtml") as string;

  await updateSource(sourceId, {
    processedHtml,
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export async function removeSourceProcessedHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;

  await updateSource(sourceId, {
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

export async function updateExtractedRecipeAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const extractedRecipe = formData.get("extractedRecipe") as string;

  await updateSource(sourceId, { extractedRecipe });

  redirect(`/sources/${sourceId}`);
}

export async function removeExtractedRecipeAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;

  await updateSource(sourceId, { extractedRecipe: "" });

  redirect(`/sources/${sourceId}`);
}

export async function deleteSourceAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;

  await deleteSource(sourceId);

  redirect("/sources");
}
