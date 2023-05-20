import { ValidateIf, ValidationOptions } from "class-validator";

export default function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}
