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
    base: '/gj8VVzu5KeXnGOXF/',
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
            "/description": {
                target: 'http://60.205.182.37:8000',
                changeOrigin: true,
            },
            "/scene": {
                target: 'http://60.205.182.37:8000',
                changeOrigin: true,
            },
            "/kitchen": {
                target: 'http://60.205.182.37:8000',
                changeOrigin: true,
            },
            "/detection": {
                target: 'http://10.117.56.224:8000',
                changeOrigin: true,
            },
        },
    },
});
