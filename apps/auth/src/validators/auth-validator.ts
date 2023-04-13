import { ActivateRequestData, LoginRequestData } from "@mg-control/types";
import Joi from "joi";

import validate from "@/utils/validate";

const ActivateRequestDataSchema = Joi.object<ActivateRequestData>({
  activateCode: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateActivate = validate(ActivateRequestDataSchema);

const LoginRequestDataSchema = Joi.object<LoginRequestData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateLogin = validate(LoginRequestDataSchema);
