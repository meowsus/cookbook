import { getRecipe } from "@/lib/db/recipes";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import DeleteRecipeForm from "../DeleteRecipeForm";
import UpdateRecipeForm from "./UpdateRecipeForm";
import Breadcrumbs from "@/app/Breadcrumbs";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

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
        <UpdateRecipeForm
          recipeId={recipeId}
          name={recipe.name}
          content={recipe.content}
        />
      </div>
    </div>
  );
}
