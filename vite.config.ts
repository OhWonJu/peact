import { defineConfig } from "vite";
import path from "path";
import babel from "vite-plugin-babel";

export default defineConfig({
  esbuild: {
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
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "automatic", // 자동으로 pragma를 사용하도록 설정
              // importSource: "src/core/peact", // Peact의 경로를 지정
              // pragma: "Peact.createElement",
              // pragmaFrag: "Preact.Fragment",
              throwIfNamespace: false, //  JSX 스펙에서는 허용되지만 React에서는 허용되지 않는 JSX인 경우 에러를 throw할건지 말건지 결정하는 옵션
            },
          ],
          ["@babel/plugin-transform-runtime", { corejs: 3 }],
        ],
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
