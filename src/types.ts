export enum ApiErrorCode {
  VALIDATION_ERROR,
  NOT_FOUND,
}

export interface ApiErrors {
  message: string;
  code: ApiErrorCode;
  validation?: Record<string, string[]>;
}

export type ApiSuccessResponse<T> = T;
export type ApiErrorResponse = ApiErrors;
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
