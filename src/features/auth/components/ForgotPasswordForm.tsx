import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";
import { Input, Button, Alert, Card } from "../../../components/ui";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, error } = useForgotPassword();

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
      >
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Recuperar senha</h2>
          <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
              <Alert variant="error">
                {(error as Error).message}
              </Alert>
          )}
          {isSuccess && (
              <div className="text-center space-y-2">
                  <Alert variant="success">
                    E-mail enviado com sucesso! Verifique sua caixa de entrada.
                  </Alert>

                  {/* 🔹 Simulación visual del link del e-mail */}
                  <Link
                  to="/reset-password"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400 block"
                  >
                  Simular link recebido por e-mail
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
              Enviar e-mail
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Você receberá um link de redefinição de senha no e-mail informado.
          </p>


          <div className="text-center">
              <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                  Voltar para login
              </Link>
          </div>
      </form>
    </Card>
  );
}
