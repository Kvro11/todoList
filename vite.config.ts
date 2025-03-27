// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: "terser", // Minify JS using Terser (better compression)
    sourcemap: false, // Disable source maps in production
    target: "esnext", // Optimize for modern browsers
    chunkSizeWarningLimit: 500, // Reduce warning for chunk size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Extract vendor libraries into a separate chunk
          }
        },
      },
    },
  },
  server: {
    cors: true,
    open: true, // Automatically open in browser
  },
});
