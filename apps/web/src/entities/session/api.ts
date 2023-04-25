import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

const sessionApi = {
  refreshToken: () => http.client.get<AuthResponse>("auth/refresh-token"),
};

export default sessionApi;
