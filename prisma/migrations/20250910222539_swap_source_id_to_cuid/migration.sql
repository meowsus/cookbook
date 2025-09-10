/*
  Warnings:

  - The primary key for the `Source` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "fullHtml" TEXT NOT NULL DEFAULT '',
    "processedHtml" TEXT NOT NULL DEFAULT '',
    "extractedRecipe" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Source" ("createdAt", "extractedRecipe", "fullHtml", "id", "processedHtml", "updatedAt", "url") SELECT "createdAt", "extractedRecipe", "fullHtml", "id", "processedHtml", "updatedAt", "url" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
