import { getRecipe } from "@/lib/db/recipes";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import DeleteRecipeForm from "../DeleteRecipeForm";
import UpdateRecipeForm from "../UpdateRecipeForm";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

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
