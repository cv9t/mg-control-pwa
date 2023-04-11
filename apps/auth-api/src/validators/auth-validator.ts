import { ActivationRequestData } from "@mg-control/types";
import Joi from "joi";

import validate from "@/utils/validate";

const ActivationRequestDataSchema = Joi.object<ActivationRequestData>({
  activationCode: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateActivation = validate(ActivationRequestDataSchema);
