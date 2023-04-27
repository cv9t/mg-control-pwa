import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

export const refreshToken = () => http.client.get<AuthResponse>("auth/refresh-token");
