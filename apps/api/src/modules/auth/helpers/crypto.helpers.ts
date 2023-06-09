import crypto from 'crypto';

export const hashData = (data: string): string =>
  crypto.createHash('sha256').update(data).digest('hex');

export const verifyHashedData = (data: string, hashedData: string): boolean =>
  hashData(data) === hashedData;
