import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../infrastructure/services/authService";
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}
