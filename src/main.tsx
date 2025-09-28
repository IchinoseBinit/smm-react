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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    
      <ChakraProvider value={system}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
          <Toaster />
        </BrowserRouter>
      </ChakraProvider>
  
    </QueryClientProvider>
  </HelmetProvider>,
);
