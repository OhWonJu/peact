import { defineConfig } from "vite";
import path from "path";
import babel from "vite-plugin-babel";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxDev: false,
    jsxFactory: "Peact.createElement",
    jsxFragment: "Peact.Fragment",
    jsxInject: `import Peact from "@core/peact"`,
  },
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: [["@babel/preset-env"], ["@babel/preset-typescript"]],
        plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
      },
    }),
  ],
  build: {
    target: "esnext",
  },
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
});
