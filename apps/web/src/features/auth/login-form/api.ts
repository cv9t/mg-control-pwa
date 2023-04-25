import { LoginRequestData } from "@mg-control/types";

import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

const loginFormApi = {
  login: (data: LoginRequestData) => http.client.post<AuthResponse>("auth/login", data, { _error_alert: false }),
};

export default loginFormApi;
