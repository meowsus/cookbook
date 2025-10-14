"use server";

import { createRecipe, deleteRecipe, updateRecipe } from "@/lib/db/recipes";
import { authActionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const CreateRecipeFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
  name: zfd.text(z.string()),
  content: zfd.text(z.string()),
});

export const createRecipeAction = authActionClient
  .metadata({ actionName: "createRecipeAction" })
  .inputSchema(CreateRecipeFormDataSchema)
  .action(async ({ parsedInput: { sourceId, name, content }, ctx }) => {
    const recipe = await createRecipe({
      source: {
        connect: { id: sourceId },
      },
      name,
      content,
      user: {
        connect: { id: ctx.userId },
      },
    });

    redirect(`/recipes/${recipe.id}`);
  });

const UpdateRecipeFormDataSchema = zfd.formData({
  recipeId: zfd.text(z.string().nonempty()),
  name: zfd.text(z.string()),
  content: zfd.text(z.string()),
});

export const updateRecipeAction = authActionClient
  .metadata({ actionName: "updateRecipeAction" })
  .inputSchema(UpdateRecipeFormDataSchema)
  .action(async ({ parsedInput: { recipeId, name, content }, ctx }) => {
    await updateRecipe(ctx.userId, recipeId, {
      name,
      content,
    });

    redirect(`/recipes/${recipeId}`);
  });

const DeleteRecipeFormDataSchema = zfd.formData({
  recipeId: zfd.text(z.string().nonempty()),
});

export const deleteRecipeAction = authActionClient
  .metadata({ actionName: "deleteRecipeAction" })
  .inputSchema(DeleteRecipeFormDataSchema)
  .action(async ({ parsedInput: { recipeId }, ctx }) => {
    await deleteRecipe(ctx.userId, recipeId);

    redirect("/recipes");
  });
