import { PrismaClient } from "../../generated/prisma";

type GlobalThis = typeof globalThis;
type GlobalThisWithPrisma = GlobalThis & {
  prisma?: PrismaClient;
};

const globalThisWithPrisma: GlobalThisWithPrisma = globalThis;

export const prisma = globalThisWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThisWithPrisma.prisma = prisma;
