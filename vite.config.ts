import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import cleanup from "rollup-plugin-cleanup";

export default defineConfig({
  plugins: [
    solidPlugin(),
    cleanup({
      comments: "none",
      sourcemap: true,
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
