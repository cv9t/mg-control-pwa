export type LoginRequestData = {
  email: string;
  password: string;
};

export type ActivationRequestData = {
  activationCode: string;
  email: string;
  password: string;
};
