/* eslint-disable @typescript-eslint/ban-ts-comment */
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";
import swc from "unplugin-swc";
import { defineConfig, UserConfigExport } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const additionalEnvPath = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
const additionalEnv = dotenv.config({ path: additionalEnvPath }).parsed;

export default (): UserConfigExport => {
  const mainEnv = dotenv.config().parsed;
  const mergedEnv = { ...mainEnv, ...additionalEnv };

  return defineConfig({
    server: {
      port: 5050,
    },
    preview: {
      port: 5051,
    },
    define: {
      "process.env": JSON.stringify(mergedEnv),
    },
    plugins: [
      swc.vite({
        jsc: {
          experimental: {
            // @ts-ignore
            plugins: ["@effector/swc-plugin"],
          },
        },
      }),
      react(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        },
        manifest: {
          name: "Micro Green Control",
          short_name: "MG Control",
          description: "Progressive Web App",
          icons: [
            {
              src: "/icons/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          start_url: "./",
          scope: ".",
          display: "fullscreen",
          theme_color: "#000000",
          background_color: "#ffffff",
        },
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
  });
};
