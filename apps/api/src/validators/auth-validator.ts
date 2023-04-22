import { ActivateRequestData, LoginRequestData } from "@mg-control/types";
import Joi from "joi";

import { validateRequest } from "@/utils/schema-utils";

export const ActivateRequestDataSchema = Joi.object<ActivateRequestData>({
  activateCode: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateActivateRequest = validateRequest(ActivateRequestDataSchema);

export const LoginRequestDataSchema = Joi.object<LoginRequestData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateLoginRequest = validateRequest(LoginRequestDataSchema);
