import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma";

export async function createRecipe(data: Prisma.RecipeCreateInput) {
  return prisma.recipe.create({
    data,
  });
}

export async function updateRecipe(
  userId: string,
  recipeId: string,
  data: Prisma.RecipeUpdateInput,
) {
  return prisma.recipe.update({
    where: { id: recipeId, userId },
    data,
  });
}

export async function getRecipes(userId: string) {
  return prisma.recipe.findMany({ where: { userId } });
}

export async function findRecipesBySource(userId: string, sourceId: string) {
  return prisma.recipe.findMany({
    where: {
      sourceId,
      userId,
    },
  });
}

export async function getRecipe(userId: string, recipeId: string) {
  return prisma.recipe.findUnique({
    where: {
      id: recipeId,
      userId,
    },
  });
}

export async function deleteRecipe(userId: string, recipeId: string) {
  return prisma.recipe.delete({
    where: { id: recipeId, userId },
  });
}
