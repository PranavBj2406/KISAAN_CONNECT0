import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/cloudinary": {
        target: "https://api.cloudinary.com/v1_1/dntoevkln",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloudinary/, "")
      }
    },
  },
});