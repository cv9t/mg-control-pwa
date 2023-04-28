import { ActivateRequestData } from "@mg-control/types";

import { http, types } from "@/shared/api";

export const activate = (data: ActivateRequestData) => http.client.post<types.AuthResponse>("auth/activate", data, { _error_alert: false });
