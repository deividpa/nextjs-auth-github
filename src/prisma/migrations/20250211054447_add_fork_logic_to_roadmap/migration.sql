-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "forkedFromId" TEXT;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_forkedFromId_fkey" FOREIGN KEY ("forkedFromId") REFERENCES "Roadmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
