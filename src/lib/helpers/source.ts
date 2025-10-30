import { Prisma } from "@/generated/prisma";

export function getSourceProgress(
  source: Prisma.SourceGetPayload<{
    include: {
      recipes: true;
    };
  }>,
) {
  if (source.fullHtml === "") {
    return (100 / 5) * 1;
  }

  if (source.processedHtml === "") {
    return (100 / 5) * 2;
  }

  if (source.extractedRecipe === "") {
    return (100 / 5) * 3;
  }

  if (source.recipes.length === 0) {
    return (100 / 5) * 4;
  }

  return 100;
}
