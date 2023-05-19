import crypto from "crypto";

export const hashPassword = (password: string) => crypto.createHash("sha256").update(password).digest("hex");

export const isPasswordValid = (password: string, hashedPassword: string) => hashPassword(password) === hashedPassword;
