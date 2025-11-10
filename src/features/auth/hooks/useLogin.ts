import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../../infrastructure/services/authService";
import { useAuth } from "../../../shared/contexts";
export function useLogin() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
}
