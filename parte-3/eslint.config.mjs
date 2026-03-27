import globals from "globals";
import pluginsJs from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  pluginsJs.configs.recommended,
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
]);
