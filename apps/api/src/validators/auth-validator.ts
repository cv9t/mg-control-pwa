import { ActivateBody, LoginBody } from "@mg-control/types";
import Joi from "joi";

import { validateRequest } from "@/utils/schema-utils";

export const ActivateBodySchema = Joi.object<ActivateBody>({
  activateCode: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateActivateRequest = validateRequest(ActivateBodySchema);

export const LoginBodySchema = Joi.object<LoginBody>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateLoginRequest = validateRequest(LoginBodySchema);
