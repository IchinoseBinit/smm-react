import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Toaster } from "./components/ui/toaster.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./lib/theme.ts";
import { AuthProvider } from "./lib/providers/authProvider.tsx";
import { HelmetProvider } from "react-helmet-async";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
    <ColorModeProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
          <Toaster />
        </BrowserRouter>
    </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </HelmetProvider>,
);
