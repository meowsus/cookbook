"use server";

import {
  createSource,
  deleteSourceByUser,
  updateSourceByUser,
} from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import { zfd } from "zod-form-data";

const CreateSourceFormDataSchema = zfd.formData({
  url: zfd.text(z.url("A valid URL is required").nonempty()),
});

export const createSourceAction = authActionClient
  .metadata({ actionName: "createSourceAction" })
  .inputSchema(CreateSourceFormDataSchema)
  .action(async ({ parsedInput: { url }, ctx }) => {
    const source = await createSource({
      url,
      user: {
        connect: { id: ctx.userId },
      },
    });

    redirect(`/sources/${source.id}`);
  });

const UpdateSourceFullHtmlFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
  fullHtml: zfd.text(z.string().nonempty()),
});

export const updateSourceFullHtmlAction = authActionClient
  .metadata({ actionName: "updateSourceFullHtmlAction" })
  .inputSchema(UpdateSourceFullHtmlFormDataSchema)
  .action(async ({ parsedInput: { sourceId, fullHtml }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      fullHtml,
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

const RemoveSourceFullHtmlFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
});

export const removeSourceFullHtmlAction = authActionClient
  .metadata({ actionName: "removeSourceFullHtmlAction" })
  .inputSchema(RemoveSourceFullHtmlFormDataSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      fullHtml: "",
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

const UpdateSourceProcessedHtmlFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
  processedHtml: zfd.text(z.string().nonempty()),
});

export const updateSourceProcessedHtmlAction = authActionClient
  .metadata({ actionName: "updateSourceProcessedHtmlAction" })
  .inputSchema(UpdateSourceProcessedHtmlFormDataSchema)
  .action(async ({ parsedInput: { sourceId, processedHtml }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      processedHtml,
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

const RemoveSourceProcessedHtmlFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
});

export const removeSourceProcessedHtmlAction = authActionClient
  .metadata({ actionName: "removeSourceProcessedHtmlAction" })
  .inputSchema(RemoveSourceProcessedHtmlFormDataSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

const UpdateExtractedRecipeFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
  extractedRecipe: zfd.text(z.string().nonempty()),
});

export const updateSourceExtractedRecipeAction = authActionClient
  .metadata({ actionName: "updateSourceExtractedRecipeAction" })
  .inputSchema(UpdateExtractedRecipeFormDataSchema)
  .action(async ({ parsedInput: { sourceId, extractedRecipe }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, { extractedRecipe });

    redirect(`/sources/${sourceId}`);
  });

const RemoveExtractedRecipeFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
});

export const removeSourceExtractedRecipeAction = authActionClient
  .metadata({ actionName: "removeSourceExtractedRecipeAction" })
  .inputSchema(RemoveExtractedRecipeFormDataSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, { extractedRecipe: "" });

    redirect(`/sources/${sourceId}`);
  });

const DeleteSourceFormDataSchema = zfd.formData({
  sourceId: zfd.text(z.string().nonempty()),
});

export const deleteSourceAction = authActionClient
  .metadata({ actionName: "deleteSourceAction" })
  .inputSchema(DeleteSourceFormDataSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await deleteSourceByUser(ctx.userId, sourceId);

    redirect("/sources");
  });
