import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [createVuePlugin()],
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".json"],
        alias: {
            'meg-ui': path.resolve(process.cwd(), 'node_modules', 'meg-ui'),
            '@': path.resolve(process.cwd(), './src'),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3000,
        open: true,
        cors: true,
        proxy: {},
    },
});
