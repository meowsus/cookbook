"use server";

import { createSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";

export async function createSourceAction(formData: FormData) {
  const url = formData.get("url") as string;

  await createSource(url);

  redirect("/sources");
}

export async function addSourceFullHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const fullHtml = formData.get("fullHtml") as string;

  await updateSource(sourceId, { fullHtml });

  redirect(`/sources/${sourceId}`);
}

export async function addSourceProcessedHtmlAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const processedHtml = formData.get("processedHtml") as string;

  await updateSource(sourceId, { processedHtml });

  redirect(`/sources/${sourceId}`);
}

export async function addExtractedRecipeAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const extractedRecipe = formData.get("extractedRecipe") as string;

  await updateSource(sourceId, { extractedRecipe });
}
