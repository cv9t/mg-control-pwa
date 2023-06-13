export const excludeField = <T, K extends keyof T>(obj: T, field: K): Omit<T, K> => {
  const { [field]: omitted, ...rest } = obj;
  return rest;
};
