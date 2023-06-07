import crypto from 'crypto';

export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function verifyHashedData(data: string, hashedData: string): boolean {
  return hashData(data) === hashedData;
}
