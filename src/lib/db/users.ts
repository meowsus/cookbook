import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  });
}

export async function findUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findOrCreateUserByEmail(email: string) {
  let user = await findUserByEmail(email);

  if (!user) {
    user = await createUser({ email });
  }

  return user;
}

export async function updateUser(userId: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}
