"use server";

import { createRecipe, updateRecipe, deleteRecipe } from "@/lib/db/recipes";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { redirect } from "next/navigation";

const CreateRecipeDataSchema = z.object({
  sourceId: z.string().nonempty(),
  name: z.string(),
  content: z.string(),
});

export async function createRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to create a recipe",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = CreateRecipeDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    name: formData.get("name"),
    content: formData.get("content"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId, name, content } = parsedFormData.data;

  await createRecipe({
    sourceId: sourceId,
    name,
    content,
  });
}

const UpdateRecipeDataSchema = z.object({
  recipeId: z.string().nonempty(),
  name: z.string(),
  content: z.string(),
});

export async function updateRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to create a recipe",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = UpdateRecipeDataSchema.safeParse({
    recipeId: formData.get("recipeId"),
    name: formData.get("name"),
    content: formData.get("content"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { recipeId, name, content } = parsedFormData.data;

  await updateRecipe(recipeId, {
    name,
    content,
  });
}

const DeleteRecipeFormDataSchema = z.object({
  recipeId: z.string().nonempty(),
});

export async function deleteRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to delete a recipe",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = DeleteRecipeFormDataSchema.safeParse({
    recipeId: formData.get("recipeId"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { recipeId } = parsedFormData.data;

  await deleteRecipe(recipeId);

  redirect("/recipes");
}
