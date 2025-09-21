import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { auth } from "./auth";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError: (error) => {
    console.error(error);

    if (error instanceof ActionError) {
      return { error: error.message };
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return { error: error.message };
    }

    return { error: DEFAULT_SERVER_ERROR_MESSAGE };
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await next({
    ctx: {
      userId: session.user.id,
    },
  });
});
