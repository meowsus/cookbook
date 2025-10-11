import { Source } from "../../../generated/prisma";

export function getSourceProgress(source: Source) {
  if (source.fullHtml === "") {
    return 25;
  }

  if (source.processedHtml === "") {
    return 50;
  }

  if (source.extractedRecipe === "") {
    return 75;
  }

  return 100;
}
