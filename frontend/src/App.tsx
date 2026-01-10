import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/contexts/AuthContext";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import SqlSandbox from "@/pages/SqlSandbox";
import PythonSandbox from "@/pages/PythonSandbox";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            {/* Global Toasts */}
            <Toaster />
            <Sonner />

            {/* App Routing */}
            <BrowserRouter>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />

                {/* Sandbox Pages */}
                <Route path="/sql-sandbox" element={<SqlSandbox />} />
                <Route path="/python-sandbox" element={<PythonSandbox />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
