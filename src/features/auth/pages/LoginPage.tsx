import { LoginForm } from "../components/LoginForm";
import { AuthLayout } from "../../../components/layout/AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
