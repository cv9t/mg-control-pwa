import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _error_alert?: boolean;
  }
}
