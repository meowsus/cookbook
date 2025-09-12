"use server";

import {
  createSource,
  deleteSourceByUser,
  updateSourceByUser,
} from "@/lib/db/sources";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";

const CreateSourceFormDataSchema = z.object({
  url: z.url(),
});

export async function createSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to create a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = CreateSourceFormDataSchema.safeParse({
    url: formData.get("url"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { url } = parsedFormData.data;

  await createSource({
    url,
    user: {
      connect: { id: session.user.id },
    },
  });

  redirect("/sources");
}

const UpdateSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  fullHtml: z.string().nonempty(),
});

export async function updateSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = UpdateSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    fullHtml: formData.get("fullHtml"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId, fullHtml } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, {
    fullHtml,
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const RemoveSourceFullHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceFullHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = RemoveSourceFullHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, {
    fullHtml: "",
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const UpdateSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  processedHtml: z.string().nonempty(),
});

export async function updateSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = UpdateSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    processedHtml: formData.get("processedHtml"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId, processedHtml } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, {
    processedHtml,
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const RemoveSourceProcessedHtmlFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceProcessedHtmlAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = RemoveSourceProcessedHtmlFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, {
    processedHtml: "",
    extractedRecipe: "",
  });

  redirect(`/sources/${sourceId}`);
}

const UpdateExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
  extractedRecipe: z.string().nonempty(),
});

export async function updateSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = UpdateExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
    extractedRecipe: formData.get("extractedRecipe"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId, extractedRecipe } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, { extractedRecipe });

  redirect(`/sources/${sourceId}`);
}

const RemoveExtractedRecipeFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function removeSourceExtractedRecipeAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = RemoveExtractedRecipeFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId } = parsedFormData.data;

  await updateSourceByUser(session.user.id, sourceId, { extractedRecipe: "" });

  redirect(`/sources/${sourceId}`);
}

const DeleteSourceFormDataSchema = z.object({
  sourceId: z.string().nonempty(),
});

export async function deleteSourceAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to delete a source",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const parsedFormData = DeleteSourceFormDataSchema.safeParse({
    sourceId: formData.get("sourceId"),
  });

  if (!parsedFormData.success) {
    return {
      error: z.prettifyError(parsedFormData.error),
      fields: Object.fromEntries(formData.entries()),
    };
  }

  const { sourceId } = parsedFormData.data;

  await deleteSourceByUser(session.user.id, sourceId);

  redirect("/sources");
}
