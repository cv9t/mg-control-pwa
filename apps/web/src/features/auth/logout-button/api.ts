import { http } from "@/shared/api";

export const logout = () => http.client.post("/auth/logout");
