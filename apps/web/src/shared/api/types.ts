import { AxiosError } from "axios";

export type ErrorResponse = AxiosError<{ message: string; errors: string[] }>;

export type ApiErrorKind = "bad-data" | "unauthorized" | "forbidden" | "not-found" | "server-error" | "unknown";

export type ApiError = { status: number; message: string; kind: ApiErrorKind };

export type AuthResponse = {
  accessToken: string;
};
