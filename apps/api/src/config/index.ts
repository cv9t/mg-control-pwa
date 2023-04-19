import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT ?? "",
  DB_HOST: process.env.DB_HOST ?? "",
  DB_PORT: process.env.DB_PORT ?? "",
  DB_NAME: process.env.DB_NAME ?? "",
  DB_USERNAME: process.env.DB_USERNAME ?? "",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY ?? "",
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY ?? "",
  MQTT_BROKER_URL: process.env.MQTT_BROKER_URL ?? "",
  MQTT_PRIMARY_TOPIC: process.env.MQTT_PRIMARY_TOPIC ?? "",
};

export default config;
