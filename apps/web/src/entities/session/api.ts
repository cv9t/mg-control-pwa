import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

const refreshToken = () => http.client.get<AuthResponse>("auth/refresh-token");

const api = {
  refreshToken,
};

export default api;
