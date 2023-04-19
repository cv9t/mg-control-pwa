import { ActivateBody, LoginBody } from "@mg-control/types";
import Joi from "joi";

import { validateSchema } from "@/utils/schema.utils";

const ActivateBodySchema = Joi.object<ActivateBody>({
  activateCode: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateActivate = validateSchema(ActivateBodySchema);

const LoginBodySchema = Joi.object<LoginBody>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateLogin = validateSchema(LoginBodySchema);
