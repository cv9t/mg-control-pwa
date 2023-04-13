export type LoginRequestData = {
  email: string;
  password: string;
};

export type ActivateRequestData = {
  activateCode: string;
  email: string;
  password: string;
};
