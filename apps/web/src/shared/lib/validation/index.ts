import { Rule } from 'effector-forms';

export const rules = {
  required: (errorText?: string): Rule<string> => ({
    name: 'required',
    validator: (value) => !!value,
    errorText,
  }),
  email: (errorText?: string): Rule<string> => ({
    name: 'email',
    validator: (value) => /\S+@\S+\.\S+/.test(value),
    errorText,
  }),
};
