import crypto from "crypto";

export const hashData = (data: string) => crypto.createHash("sha256").update(data).digest("hex");

export const verifyHash = (data: string, hashedData: string) => hashData(data) === hashedData;
