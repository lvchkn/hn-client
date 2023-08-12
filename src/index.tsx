import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { AuthProvider } from "./components/auth/AuthProvider";

const queryClient = new QueryClient();

const element = document.getElementById("root");
const root = element && createRoot(element);

root?.render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
);
