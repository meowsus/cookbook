import Breadcrumbs from "@/app/Breadcrumbs";
import DeleteRecipeForm from "@/app/recipes/DeleteRecipeForm";
import { auth } from "@/lib/auth";
import { getRecipe } from "@/lib/db/recipes";
import { markdownToHtml } from "@/lib/helpers/markdown";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const { recipeId } = await params;

  const recipe = await getRecipe(session.user.id, recipeId);

  if (!recipe) notFound();

  const content = await markdownToHtml(recipe.content);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between items-center">
        <Breadcrumbs pageTitle={recipe.name} />

        <div className="flex flex-row items-center gap-1">
          <Link
            href={`/sources/${recipe.sourceId}`}
            title="View source"
            className="btn btn-square btn-ghost"
          >
            <GlobeAltIcon className="size-4" />
          </Link>

          <DeleteRecipeForm recipeId={recipeId} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div
              className="prose min-w-full"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
