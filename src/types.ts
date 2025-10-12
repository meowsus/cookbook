import { z } from "zod";

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
