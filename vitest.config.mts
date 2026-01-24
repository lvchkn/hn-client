/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "happy-dom",
        setupFiles: "./vitest.setup.ts",
        env: {
            REACT_APP_AUTH_ENABLED: "true",
            REACT_APP_BASE_URL: "http://localhost",
        },
    },
});
