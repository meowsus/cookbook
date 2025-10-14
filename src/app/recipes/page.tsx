import DeleteRecipeForm from "@/app/recipes/DeleteRecipeForm";
import { auth } from "@/lib/auth";
import { getRecipes } from "@/lib/db/recipes";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RecipesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const recipes = await getRecipes(session.user.id);

  return (
    <div className="space-y-4">
      <h1>Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <p>{recipe.name}</p>
            <code>{recipe.id}</code>{" "}
            <div className="inline-flex items-center gap-2">
              <Link href={`/recipes/${recipe.id}`}>View</Link>
              <Link href={`/sources/${recipe.sourceId}`}>View source</Link>
              <DeleteRecipeForm recipeId={recipe.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
