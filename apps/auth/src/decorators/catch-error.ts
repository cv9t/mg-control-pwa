/* eslint-disable @typescript-eslint/no-explicit-any */
const catchError = (message: string) => (_target: any, _key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function decorator(...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        console.log(message, err.message);
      }
    }
  };
  return descriptor;
};

export default catchError;
