/*
  Warnings:

  - Added the required column `userId` to the `Source` table without a default value. This is not possible if the table is not empty.

*/

-- Create a default user for existing sources if no users exist
INSERT OR IGNORE INTO "User" ("id", "email", "name", "createdAt", "updatedAt") 
VALUES ('default-user-id', 'admin@example.com', 'Default User', datetime('now'), datetime('now'));

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "fullHtml" TEXT NOT NULL DEFAULT '',
    "processedHtml" TEXT NOT NULL DEFAULT '',
    "extractedRecipe" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Source_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Source" ("createdAt", "extractedRecipe", "fullHtml", "id", "processedHtml", "updatedAt", "url", "userId") 
SELECT "createdAt", "extractedRecipe", "fullHtml", "id", "processedHtml", "updatedAt", "url", 'default-user-id' FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
