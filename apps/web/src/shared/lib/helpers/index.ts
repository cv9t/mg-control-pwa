export const getAccessToken = () => localStorage.getItem("mg-control-access-token");

export const setAccessToken = (value: string) => localStorage.setItem("mg-control-access-token", value);

export const removeAccessToken = () => localStorage.removeItem("mg-control-access-token");
