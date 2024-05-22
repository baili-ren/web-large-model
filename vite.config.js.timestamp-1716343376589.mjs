// vite.config.js
import { defineConfig } from "file:///D:/code/ebg-new/web-large-model-demo/node_modules/vite/dist/node/index.js";
import { createVuePlugin } from "file:///D:/code/ebg-new/web-large-model-demo/node_modules/vite-plugin-vue2/dist/index.js";
import { viteMockServe } from "file:///D:/code/ebg-new/web-large-model-demo/node_modules/vite-plugin-mock/dist/index.js";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    createVuePlugin(),
    viteMockServe({
      mockPath: "mock",
      supportTs: false
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".json"],
    alias: {
      "meg-ui": path.resolve(process.cwd(), "node_modules", "meg-ui"),
      "@": path.resolve(process.cwd(), "./src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3e3,
    open: true,
    cors: true,
    hmr: true,
    proxy: {
      "/description": {
        target: "http://60.205.182.37:8000",
        changeOrigin: true
      },
      "/scene": {
        target: "http://60.205.182.37:8000",
        changeOrigin: true
      },
      "/kitchen": {
        target: "http://60.205.182.37:8000",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGViZy1uZXdcXFxcd2ViLWxhcmdlLW1vZGVsLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcZWJnLW5ld1xcXFx3ZWItbGFyZ2UtbW9kZWwtZGVtb1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS9lYmctbmV3L3dlYi1sYXJnZS1tb2RlbC1kZW1vL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGNyZWF0ZVZ1ZVBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi12dWUyXCI7XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGNyZWF0ZVZ1ZVBsdWdpbigpLFxuICAgICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXG4gICAgICAgICAgICBzdXBwb3J0VHM6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGV4dGVuc2lvbnM6IFtcIi5qc1wiLCBcIi5qc3hcIiwgXCIudnVlXCIsIFwiLmpzb25cIl0sXG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnbWVnLXVpJzogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdub2RlX21vZHVsZXMnLCAnbWVnLXVpJyksXG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLi9zcmMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgY29yczogdHJ1ZSxcbiAgICAgICAgaG1yOiB0cnVlLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgXCIvZGVzY3JpcHRpb25cIjoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly82MC4yMDUuMTgyLjM3OjgwMDAnLFxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi9zY2VuZVwiOiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzYwLjIwNS4xODIuMzc6ODAwMCcsXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiL2tpdGNoZW5cIjoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly82MC4yMDUuMTgyLjM3OjgwMDAnLFxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLG9CQUFvQjtBQUNuVSxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFVBQVU7QUFHakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsZ0JBQWdCO0FBQUEsSUFDaEIsY0FBYztBQUFBLE1BQ1YsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLFlBQVksQ0FBQyxPQUFPLFFBQVEsUUFBUSxPQUFPO0FBQUEsSUFDM0MsT0FBTztBQUFBLE1BQ0gsVUFBVSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCLFFBQVE7QUFBQSxNQUM5RCxLQUFLLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxPQUFPO0FBQUEsSUFDNUM7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxnQkFBZ0I7QUFBQSxRQUNaLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDbEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
