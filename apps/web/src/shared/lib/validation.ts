import { Rule } from 'effector-forms';

export const validationRules = {
  required: (errorText?: string): Rule<string> => ({
    name: 'required',
    validator: (value) => Boolean(value),
    errorText,
  }),
  email: (errorText?: string): Rule<string> => ({
    name: 'email',
    validator: (value) => /\S+@\S+\.\S+/.test(value),
    errorText,
  }),
};
