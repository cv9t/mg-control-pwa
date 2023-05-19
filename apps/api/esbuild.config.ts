import { build, Plugin } from "esbuild";
import { rm } from "fs/promises";
import * as path from "path";

const resolveRoot = (...segments: string[]): string => path.resolve(__dirname, ...segments);

const clean: Plugin = {
  name: "Clean",
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setup: (build) => {
    build.onStart(async () => {
      try {
        const outdir = build.initialOptions.outdir;
        if (outdir) {
          await rm(outdir, { recursive: true });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};

build({
  platform: "node",
  entryPoints: [resolveRoot("src/main.ts")],
  outdir: resolveRoot("dist"),
  bundle: true,
  minify: true,
  tsconfig: resolveRoot("tsconfig.json"),
  plugins: [clean],
  alias: {
    "@": "./src",
  },
});
