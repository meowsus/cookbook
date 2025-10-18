import DeleteRecipeForm from "@/app/recipes/DeleteRecipeForm";
import UpdateRecipeForm from "@/app/recipes/[recipeId]/UpdateRecipeForm";
import { auth } from "@/lib/auth";
import { getRecipe } from "@/lib/db/recipes";
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

  return (
    <div className="space-y-4">
      {recipe && (
        <>
          <h1>
            Recipe: <code>{recipe.name}</code>
          </h1>
          <Link href={`/sources/${recipe.sourceId}`}>View source</Link>

          <UpdateRecipeForm
            recipeId={recipeId}
            name={recipe.name}
            content={recipe.content}
          />
          <DeleteRecipeForm recipeId={recipeId} />
        </>
      )}
    </div>
  );
}
