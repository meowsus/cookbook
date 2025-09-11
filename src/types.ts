import { z } from "zod";

export enum ApiErrorCode {
  VALIDATION_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
}

export interface ApiError<T> {
  message: string;
  code: ApiErrorCode;
  validation?: z.ZodFlattenedError<T>;
}
