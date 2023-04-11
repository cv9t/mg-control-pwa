/* eslint-disable @typescript-eslint/no-explicit-any */
export type CatchErrorOptions = {
  withErrorMessage?: boolean;
  onCatch?: (err: Error) => void;
};

export default (message: string, options?: CatchErrorOptions) => (_target: any, _key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function decorator(...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        if (options?.withErrorMessage) {
          console.log(message, err.message);
        }
        if (options?.onCatch) {
          options.onCatch(err);
        }
        return;
      }
      console.log(message);
    }
  };
  return descriptor;
};
