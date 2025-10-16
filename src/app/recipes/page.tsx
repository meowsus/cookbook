import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRecipes } from "@/lib/db/recipes";
import Breadcrumbs from "../Breadcrumbs";
import RecipesList from "./RecipesList";
import NoRecipesCard from "./NoRecipesCard";

export default async function RecipesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const recipes = await getRecipes(session.user.id);

  const hasRecipes = recipes.length > 0;

  return (
    <div className="grow flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Breadcrumbs pageTitle="Recipes" />
      </div>

      {hasRecipes ? (
        <RecipesList recipes={recipes} />
      ) : (
        <div className="grow flex items-center justify-center">
          <NoRecipesCard />
        </div>
      )}
    </div>
  );
}
