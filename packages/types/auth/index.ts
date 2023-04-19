export type LoginBody = {
  email: string;
  password: string;
};

export type ActivateBody = {
  activateCode: string;
  email: string;
  password: string;
};
