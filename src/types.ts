import { z } from "zod";
import { Prisma } from "../generated/prisma";

// API

export enum ApiErrorCode {
  VALIDATION_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
  INVALID_RESPONSE,
}

export interface ApiError<T> {
  message: string;
  code: ApiErrorCode;
  validation?: z.ZodFlattenedError<T>;
}

// Sources

export type SourceWithRecipes = Prisma.SourceGetPayload<{
  include: Pick<Prisma.SourceInclude, "recipes">;
}>;
