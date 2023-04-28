import { LoginRequestData } from "@mg-control/types";

import { http, types } from "@/shared/api";

export const login = (data: LoginRequestData) => http.client.post<types.AuthResponse>("auth/login", data, { _error_alert: false });
