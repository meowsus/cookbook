"use server";

import {
  createSource,
  deleteSourceByUser,
  updateSourceByUser,
} from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { authActionClient } from "../safe-action";
import {
  CreateSourceSchema,
  UpdateSourceFullHtmlSchema,
  RemoveSourceFullHtmlSchema,
  UpdateSourceProcessedHtmlSchema,
  RemoveSourceProcessedHtmlSchema,
  UpdateExtractedRecipeSchema,
  RemoveExtractedRecipeSchema,
  DeleteSourceSchema,
} from "./sources.schema";

export const createSourceAction = authActionClient
  .metadata({ actionName: "createSourceAction" })
  .inputSchema(CreateSourceSchema)
  .action(async ({ parsedInput: { url }, ctx }) => {
    const source = await createSource({
      url,
      user: {
        connect: { id: ctx.userId },
      },
    });

    redirect(`/sources/${source.id}`);
  });

export const updateSourceFullHtmlAction = authActionClient
  .metadata({ actionName: "updateSourceFullHtmlAction" })
  .inputSchema(UpdateSourceFullHtmlSchema)
  .action(async ({ parsedInput: { sourceId, fullHtml }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      fullHtml,
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

export const removeSourceFullHtmlAction = authActionClient
  .metadata({ actionName: "removeSourceFullHtmlAction" })
  .inputSchema(RemoveSourceFullHtmlSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      fullHtml: "",
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

export const updateSourceProcessedHtmlAction = authActionClient
  .metadata({ actionName: "updateSourceProcessedHtmlAction" })
  .inputSchema(UpdateSourceProcessedHtmlSchema)
  .action(async ({ parsedInput: { sourceId, processedHtml }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      processedHtml,
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

export const removeSourceProcessedHtmlAction = authActionClient
  .metadata({ actionName: "removeSourceProcessedHtmlAction" })
  .inputSchema(RemoveSourceProcessedHtmlSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, {
      processedHtml: "",
      extractedRecipe: "",
    });

    redirect(`/sources/${sourceId}`);
  });

export const updateSourceExtractedRecipeAction = authActionClient
  .metadata({ actionName: "updateSourceExtractedRecipeAction" })
  .inputSchema(UpdateExtractedRecipeSchema)
  .action(async ({ parsedInput: { sourceId, extractedRecipe }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, { extractedRecipe });

    redirect(`/sources/${sourceId}`);
  });

export const removeSourceExtractedRecipeAction = authActionClient
  .metadata({ actionName: "removeSourceExtractedRecipeAction" })
  .inputSchema(RemoveExtractedRecipeSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await updateSourceByUser(ctx.userId, sourceId, { extractedRecipe: "" });

    redirect(`/sources/${sourceId}`);
  });

export const deleteSourceAction = authActionClient
  .metadata({ actionName: "deleteSourceAction" })
  .inputSchema(DeleteSourceSchema)
  .action(async ({ parsedInput: { sourceId }, ctx }) => {
    await deleteSourceByUser(ctx.userId, sourceId);

    redirect("/sources");
  });
