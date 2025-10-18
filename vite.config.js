import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/seller/",
  plugins: [react()],
  define: {
    global: "window", // 👈 polyfill global
  },
});
