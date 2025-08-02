import { createSource, updateSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";

export async function createSourceAction(formData: FormData) {
  "use server";

  const url = formData.get("url") as string;

  await createSource(url);

  redirect("/sources");
}

export async function addSourceHtmlAction(formData: FormData) {
  "use server";

  const sourceId = formData.get("sourceId") as string;
  const html = formData.get("html") as string;

  await updateSource(sourceId, { html });

  redirect(`/sources/${sourceId}`);
}
