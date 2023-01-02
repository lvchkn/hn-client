import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const queryClient = new QueryClient();

const element = document.getElementById("root");
const root = createRoot(element!);

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
