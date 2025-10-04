"use server";

import { createRecipe, updateRecipe, deleteRecipe } from "@/lib/db/recipes";
import { z } from "zod";
import { redirect } from "next/navigation";
import { authActionClient } from "../safe-action";
import { zfd } from "zod-form-data";

const CreateRecipeFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
  name: zfd.text(z.string()),
  content: zfd.text(z.string()),
});

export const createRecipeAction = authActionClient
  .metadata({ actionName: "createRecipeAction" })
  .inputSchema(CreateRecipeFormDataSchema)
  .action(async ({ parsedInput: { sourceId, name, content } }) => {
    await createRecipe({
      sourceId: sourceId,
      name,
      content,
    });
  });

const UpdateRecipeFormDataSchema = zfd.formData({
  recipeId: zfd.text(z.string().nonempty()),
  name: zfd.text(z.string()),
  content: zfd.text(z.string()),
});

export const updateRecipeAction = authActionClient
  .metadata({ actionName: "updateRecipeAction" })
  .inputSchema(UpdateRecipeFormDataSchema)
  .action(async ({ parsedInput: { recipeId, name, content } }) => {
    await updateRecipe(recipeId, {
      name,
      content,
    });
  });

const DeleteRecipeFormDataSchema = zfd.formData({
  recipeId: zfd.text(z.string().nonempty()),
});

export const deleteRecipeAction = authActionClient
  .metadata({ actionName: "deleteRecipeAction" })
  .inputSchema(DeleteRecipeFormDataSchema)
  .action(async ({ parsedInput: { recipeId } }) => {
    await deleteRecipe(recipeId);

    redirect("/recipes");
  });
