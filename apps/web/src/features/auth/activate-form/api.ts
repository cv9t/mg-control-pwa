import { ActivateRequestData } from "@mg-control/types";

import { http } from "@/shared/api";
import { AuthResponse } from "@/shared/api/types";

const activateFormApi = {
  activate: (data: ActivateRequestData) => http.client.post<AuthResponse>("auth/activate", data, { _error_alert: false }),
};

export default activateFormApi;
