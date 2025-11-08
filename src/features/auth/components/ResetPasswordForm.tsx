import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Alert, Card } from "../../../components/ui";

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

  // 🔹 Verifica requisitos dinámicamente
  const checkStrength = (value: string) => {
    setRules({
      lower: /[a-z]/.test(value),
      upper: /[A-Z]/.test(value),
      number: /\d/.test(value),
      length: value.length >= 8,
    });
  };

  // 🔹 Calcula si todos los requisitos están OK
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
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Redefinir senha
        </h2>

        <Input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            setPassword(val);
            checkStrength(val);
          }}
        />

        {/* 🔹 Requisitos dinámicos */}
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li className={rules.lower ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • Pelo menos uma letra minúscula
          </li>
          <li className={rules.upper ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • Pelo menos uma letra maiúscula
          </li>
          <li className={rules.number ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • Pelo menos um número
          </li>
          <li className={rules.length ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
            • Mínimo 8 caracteres
          </li>
        </ul>

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* 🔹 Mensajes */}
        {password && confirm && password !== confirm && (
          <Alert variant="error">
            As senhas não coincidem
          </Alert>
        )}

        {error && (
          <Alert variant="error">
            {(error as Error).message}
          </Alert>
        )}
        {isSuccess && (
          <Alert variant="success">
            Senha redefinida com sucesso!
          </Alert>
        )}

        {/* 🔹 Botón principal */}
        <Button
          type="submit"
          disabled={!allValid || isPending}
          isLoading={isPending}
          variant={allValid ? "primary" : "secondary"}
          className="w-full"
        >
          Salvar nova senha
        </Button>

        <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
    Se você não deseja alterar sua senha agora,{" "}
    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
      volte para o login
    </Link>.
  </p>

        </div>
      </form>
    </Card>
  );
}
