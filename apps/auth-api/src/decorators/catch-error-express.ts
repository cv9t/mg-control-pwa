/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export default (_target: any, _key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function decorator(...args: [Request, Response, NextFunction]) {
    try {
      await originalMethod.apply(this, args);
    } catch (error) {
      args[2](error);
    }
  };
  return descriptor;
};
