import prisma from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma";

export async function createSource(url: string) {
  return prisma.source.create({
    data: {
      url,
    },
  });
}

export async function updateSource(
  sourceId: string,
  data: Prisma.SourceUpdateInput,
) {
  return prisma.source.update({
    where: { id: parseInt(sourceId) },
    data,
  });
}

export async function getSources() {
  return prisma.source.findMany();
}

export async function getSource(sourceId: string) {
  return prisma.source.findUnique({
    where: {
      id: parseInt(sourceId),
    },
  });
}
