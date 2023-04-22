/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const Bind = (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => ({
  configurable: true,
  enumerable: false,
  get() {
    const boundFn = descriptor.value.bind(this);
    Object.defineProperty(this, propertyKey, {
      configurable: true,
      enumerable: false,
      value: boundFn,
      writable: true,
    });
    return boundFn;
  },
});

export const RouteHandler = (_target: any, _key: string, descriptor: PropertyDescriptor) => {
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
