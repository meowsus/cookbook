import prisma from "@/lib/prisma";

export async function createSource(url: string) {
  return prisma.source.create({
    data: {
      url,
    },
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
