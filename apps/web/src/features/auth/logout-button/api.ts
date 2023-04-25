import { http } from "@/shared/api";

const logoutButtonApi = {
  logout: () => http.client.post("/auth/logout"),
};

export default logoutButtonApi;
