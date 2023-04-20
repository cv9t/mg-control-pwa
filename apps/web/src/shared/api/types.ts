import { AxiosError } from "axios";

export type ErrorResponse = {
  message: string;
  errors: string[];
};

export type ResponseError = AxiosError<ErrorResponse>;

export type ApiError = {
  status: number;
  message: string;
};
