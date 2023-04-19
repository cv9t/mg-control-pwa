import { DeviceSensorData } from "@mg-control/types";
import Joi from "joi";

import { validateSchema } from "@/utils/schema.utils";

export const DeviceSensorDataSchema = Joi.object<DeviceSensorData>({
  air: Joi.object({
    humidity: Joi.number().required(),
    temp: Joi.number().required(),
  }).required(),
  soil: Joi.object({
    moisture: Joi.number().required(),
    temp: Joi.number().required(),
  }),
  liquid: Joi.number().required(),
});

export const validateDeviceSensorData = validateSchema(DeviceSensorDataSchema);
