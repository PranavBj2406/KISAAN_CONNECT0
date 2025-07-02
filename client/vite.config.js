import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/cloudinary": {
        target: process.env.VITE_CLOUD_API ,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloudinary/, "")
      }
    },
  },
});