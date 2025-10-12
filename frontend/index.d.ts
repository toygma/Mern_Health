import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiError {
  data?: {
    message?: string;
    [key: string]: any;
  };
  status?: number | string;
}

export type RTKError = FetchBaseQueryError & ApiError;
