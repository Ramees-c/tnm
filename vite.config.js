import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api-tnm.tutor-nearme.com",
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true, 
  },
});
