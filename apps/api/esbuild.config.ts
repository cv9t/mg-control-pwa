import * as esbuild from "esbuild";
import { rm } from "fs/promises";
import path from "path";

const resolveRoot = (...segments: string[]): string => path.resolve(__dirname, ...segments);

const cleanPlugin: esbuild.Plugin = {
  name: "CleanPlugin",
  setup(build) {
    build.onStart(async () => {
      try {
        const { outdir } = build.initialOptions;
        if (outdir) {
          await rm(outdir, { recursive: true });
        }
      } catch (e) {}
    });
  },
};

esbuild.build({
  entryPoints: [resolveRoot("src/server.ts")],
  outdir: resolveRoot("dist"),
  bundle: true,
  minify: true,
  tsconfig: path.join(__dirname, "tsconfig.json"),
  plugins: [cleanPlugin],
  alias: {
    "~": "./src/*",
  },
});
