-- AlterTable
ALTER TABLE "Edge" ALTER COLUMN "capacity" SET DEFAULT floor(random() * 9990000 + 10000);
