import { fileURLToPath } from "node:url";
import preact from "@preact/preset-vite";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tailwind()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "node:crypto": fileURLToPath(
        new URL("./src/shims/crypto.ts", import.meta.url),
      ),
    },
  },
});
