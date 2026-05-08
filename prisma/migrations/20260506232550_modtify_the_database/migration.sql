/*
  Warnings:

  - You are about to drop the column `email` on the `EmailLog` table. All the data in the column will be lost.
  - You are about to drop the column `sucess` on the `EmailLog` table. All the data in the column will be lost.
  - Added the required column `success` to the `EmailLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toEmail` to the `EmailLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmailLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "toEmail" TEXT NOT NULL,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL
);
INSERT INTO "new_EmailLog" ("id", "sentAt") SELECT "id", "sentAt" FROM "EmailLog";
DROP TABLE "EmailLog";
ALTER TABLE "new_EmailLog" RENAME TO "EmailLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
