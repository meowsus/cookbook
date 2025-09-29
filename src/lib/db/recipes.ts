import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma";

export async function createRecipe(data: Prisma.RecipeCreateInput) {
  return prisma.recipe.create({
    data,
  });
}

export async function updateRecipe(
  recipeId: string,
  data: Prisma.RecipeUpdateInput,
) {
  return prisma.recipe.update({
    where: { id: recipeId },
    data,
  });
}

export async function getRecipes() {
  return prisma.recipe.findMany();
}

export async function findRecipesBySource(sourceId: string) {
  return prisma.recipe.findMany({
    where: {
      sourceId,
    },
  });
}

export async function getRecipe(recipeId: string) {
  return prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });
}

export async function deleteRecipe(recipeId: string) {
  return prisma.recipe.delete({
    where: { id: recipeId },
  });
}
