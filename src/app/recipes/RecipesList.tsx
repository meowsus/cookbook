import { DocumentTextIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Recipe } from "../../../generated/prisma";
import DeleteRecipeForm from "./DeleteRecipeForm";

interface RecipesListProps {
  recipes: Recipe[];
}

export default function RecipesList({ recipes }: RecipesListProps) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Here are the recipes that you've added so far. Add more by extracting
        recipes from <Link href="/sources">your sources</Link>.
      </li>

      {recipes.map((recipe) => (
        <li className="list-row items-center" key={recipe.id}>
          <div className="hidden sm:block">
            <DocumentTextIcon className="size-10 text-slate-500" />
          </div>
          <div className="flex flex-col gap-2">{recipe.name}</div>
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <Link
              href={`/recipes/${recipe.id}`}
              title="View recipe"
              className="btn btn-square btn-ghost"
            >
              <EyeIcon className="size-4" />
            </Link>

            <DeleteRecipeForm recipeId={recipe.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
