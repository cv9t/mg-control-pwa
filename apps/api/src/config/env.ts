import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT ?? "";

export const DB_HOST = process.env.DB_HOST ?? "";
export const DB_PORT = process.env.DB_PORT ?? "";
export const DB_NAME = process.env.DB_NAME ?? "";
export const DB_USERNAME = process.env.DB_USERNAME ?? "";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "";

export const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY ?? "";
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY ?? "";

export const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL ?? "";
export const MQTT_PRIMARY_TOPIC = process.env.MQTT_PRIMARY_TOPIC ?? "";
