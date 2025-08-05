/*
  Warnings:

  - You are about to drop the column `html` on the `Source` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "fullHtml" TEXT NOT NULL DEFAULT '',
    "processedHtml" TEXT NOT NULL DEFAULT '',
    "extractedRecipe" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Source" ("createdAt", "extractedRecipe", "id", "updatedAt", "url") SELECT "createdAt", "extractedRecipe", "id", "updatedAt", "url" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
