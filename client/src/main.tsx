import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";

import "./index.css";
import App from "./App";
import { AuthProvider } from "../context/AuthContext";
import { ChatProvider } from "../context/ChatContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
