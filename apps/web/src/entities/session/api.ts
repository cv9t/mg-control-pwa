import { http, types } from "@/shared/api";

export const refreshToken = () => http.client.get<types.AuthResponse>("auth/refresh-token");
