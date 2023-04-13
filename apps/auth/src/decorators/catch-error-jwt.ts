/* eslint-disable @typescript-eslint/no-explicit-any */
const catchErrorJwt = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function decorator(...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  return descriptor;
};

export default catchErrorJwt;
