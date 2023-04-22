import { LoginRequestData } from "@mg-control/types";

import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

const login = (data: LoginRequestData) => http.client.post<AuthResponse>("auth/login", data);

const api = {
  login,
};

export default api;
