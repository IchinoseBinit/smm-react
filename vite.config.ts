import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // visualizer({ open: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chakra: ["@chakra-ui/react"],
          router: ["react-router"],
        },
      },
    },
  },
});
