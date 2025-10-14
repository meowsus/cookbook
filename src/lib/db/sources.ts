import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma";

export async function createSource(data: Prisma.SourceCreateInput) {
  return prisma.source.create({
    data,
  });
}

export async function updateSourceByUser(
  userId: string,
  sourceId: string,
  data: Prisma.SourceUpdateInput,
) {
  return prisma.source.update({
    where: {
      id: sourceId,
      userId,
    },
    data,
  });
}

export async function findSourcesByUser(userId: string) {
  return prisma.source.findMany({
    where: { userId },
    include: {
      user: true,
    },
  });
}

export async function findSourceByUser(userId: string, sourceId: string) {
  return prisma.source.findUnique({
    where: {
      id: sourceId,
      userId,
    },
    include: {
      user: true,
    },
  });
}

export async function deleteSourceByUser(userId: string, sourceId: string) {
  return prisma.source.delete({
    where: {
      id: sourceId,
      userId,
    },
  });
}
