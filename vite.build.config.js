import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [createVuePlugin()],
    base: '/web-large-model/',
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".json"],
        alias: {
            '@': path.resolve(process.cwd(), './src'),
        },
    },
    build: {
        cssCodeSplit: false,
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                format: "umd",
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});
