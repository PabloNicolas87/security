import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ThemeProvider, ChatProvider } from '../shared/contexts';
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ResetPasswordPage } from "../features/auth/pages/ResetPasswordPage";
import { ProtectedLayout } from "../components/layout/ProtectedLayout";
import { EventsPage } from "../features/events/pages/EventsPage";
import { ChatPage } from "../features/chat/pages/ChatPage";

export function AppRouter() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </ChatProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
