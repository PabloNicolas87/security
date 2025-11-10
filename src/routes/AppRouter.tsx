import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider, ThemeProvider, ChatProvider } from '../shared/contexts';
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";

// Lazy loading de páginas
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("../features/auth/pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage })));
const DashboardPage = lazy(() => import("../features/dashboard/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const EventsPage = lazy(() => import("../features/events/pages/EventsPage").then(m => ({ default: m.EventsPage })));
const ChatPage = lazy(() => import("../features/chat/pages/ChatPage").then(m => ({ default: m.ChatPage })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  </div>
);

export function AppRouter() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                  </Route>
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ChatProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
