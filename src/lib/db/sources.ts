import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma";

export async function createSource(data: Prisma.SourceCreateInput) {
  return prisma.source.create({
    data,
  });
}

export async function updateSource(
  sourceId: string,
  data: Prisma.SourceUpdateInput,
) {
  return prisma.source.update({
    where: { id: sourceId },
    data,
  });
}

export async function findSources() {
  return prisma.source.findMany();
}

export async function findSource(sourceId: string) {
  return prisma.source.findUnique({
    where: {
      id: sourceId,
    },
  });
}

export async function deleteSource(sourceId: string) {
  return prisma.source.delete({
    where: { id: sourceId },
  });
}
