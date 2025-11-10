import { useState, useEffect } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../../../shared/hooks/useToast";
import { Input, Button, Card } from "../../../components/ui";
export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rules, setRules] = useState({
    lower: false,
    upper: false,
    number: false,
    length: false,
  });
  const { mutate, isPending, isSuccess, error } = useResetPassword();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.resetPassword.success'));
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [isSuccess, t, toast, navigate]);
  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error, toast]);
  const checkStrength = (value: string) => {
    setRules({
      lower: /[a-z]/.test(value),
      upper: /[A-Z]/.test(value),
      number: /\d/.test(value),
      length: value.length >= 8,
    });
  };
  const allValid =
    Object.values(rules).every(Boolean) && password === confirm;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    mutate(password, {
      onSuccess: () => setTimeout(() => navigate("/login"), 1500),
    });
  };
  return (
    <Card className="max-w-sm mx-auto shadow-md" hover={false}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          {t('auth.resetPassword.title')}
        </h2>
        <Input
          id="reset-password"
          type="password"
          label={t('auth.resetPassword.password')}
          placeholder={t('auth.resetPassword.password')}
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            setPassword(val);
            checkStrength(val);
          }}
          aria-required="true"
          aria-describedby="password-requirements"
        />
        <ul id="password-requirements" className="text-xs text-gray-600 dark:text-gray-400 space-y-1"
          role="status"
          aria-live="polite"
        >
          <li className={rules.lower ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • {t('auth.resetPassword.requirements.lowercase')}
          </li>
          <li className={rules.upper ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • {t('auth.resetPassword.requirements.uppercase')}
          </li>
          <li className={rules.number ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • {t('auth.resetPassword.requirements.number')}
          </li>
          <li className={rules.length ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • {t('auth.resetPassword.requirements.length')}
          </li>
        </ul>
        <Input
          id="reset-confirm"
          type="password"
          label={t('auth.resetPassword.confirm')}
          placeholder={t('auth.resetPassword.confirm')}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-required="true"
          error={password && confirm && password !== confirm ? t('auth.resetPassword.mismatch') : undefined}
        />
        {password && confirm && password !== confirm && (
          <></>
        )}
        <Button
          type="submit"
          disabled={!allValid || isPending}
          isLoading={isPending}
          variant={allValid ? "primary" : "secondary"}
          className="w-full"
        >
          {t('auth.resetPassword.submit')}
        </Button>
        <div className="text-center">
        <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
    {t('auth.resetPassword.backToLogin')}{" "}
    <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-white rounded px-1">
      {t('auth.forgotPassword.backToLogin')}
    </Link>.
  </p>
        </div>
      </form>
    </Card>
  );
}
