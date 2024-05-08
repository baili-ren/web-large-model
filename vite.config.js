import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { viteMockServe } from 'vite-plugin-mock';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        createVuePlugin(),
        viteMockServe({
            mockPath: 'mock',
            supportTs: false
        })
    ],
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
        hmr: true,
        proxy: {
            "/kitchen": {
                target: 'http://60.205.182.37:8000',
            },
            "/description": {
                target: 'http://60.205.182.37:8000',
            },
            "/scene": {
                target: 'http://60.205.182.37:8000',
            },
        },
    },
});
