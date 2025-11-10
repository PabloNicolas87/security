import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../infrastructure/services/authService";
export function useResetPassword() {
  return useMutation({
    mutationFn: (password: string) => resetPassword(password),
  });
}
