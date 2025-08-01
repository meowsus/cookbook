import { createSource } from "@/lib/db/sources";
import { redirect } from "next/navigation";

export async function createSourceAction(formData: FormData) {
  "use server";

  const url = formData.get("url") as string;

  await createSource(url);

  redirect("/sources");
}
