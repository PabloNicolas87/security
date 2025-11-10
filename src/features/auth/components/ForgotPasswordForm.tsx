import { useState, useEffect } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../shared/hooks/useToast";
import { Input, Button, Card } from "../../../components/ui";
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, error } = useForgotPassword();
  const { t } = useTranslation();
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.forgotPassword.success'));
      setEmail("");
    }
  }, [isSuccess, t, toast]);
  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error, toast]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return (
    <Card className="max-w-sm mx-auto shadow-md" hover={false}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">{t('auth.forgotPassword.title')}</h2>
          <Input
              id="forgot-email"
              type="email"
              label={t('auth.forgotPassword.email')}
              placeholder={t('auth.forgotPassword.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              helperText={t('auth.forgotPassword.description')}
          />
          {isSuccess && (
              <div className="text-center">
                  <Link
                  to="/reset-password"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-300 block focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-white rounded px-1"
                  >
                  {t('auth.forgotPassword.simulateLink')}
                  </Link>
              </div>
          )}
          <Button
              type="submit"
              disabled={!validateEmail(email) || isPending}
              isLoading={isPending}
              variant={validateEmail(email) ? "primary" : "secondary"}
              className="w-full"
          >
              {t('auth.forgotPassword.submit')}
          </Button>
          <div className="text-center">
              <Link
                  to="/login"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-white rounded px-1"
              >
                  {t('auth.forgotPassword.backToLogin')}
              </Link>
          </div>
      </form>
    </Card>
  );
}
