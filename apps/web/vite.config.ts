import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
const result = dotenv.config({ path: envFile });

export default () => {
  const env = result.parsed ?? {};
  return defineConfig({
    server: {
      port: 5050,
    },
    preview: {
      port: 5051,
    },
    define: {
      "process.env": JSON.stringify(env),
    },
    plugins: [
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
