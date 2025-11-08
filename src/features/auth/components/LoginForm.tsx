import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { Input, Button, Alert, Card } from "../../../components/ui";

const TEST_CREDENTIALS = {
  email: "admin@teste.com",
  password: "Admin123",
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fillCredentials = () => {
    setEmail(TEST_CREDENTIALS.email);
    setPassword(TEST_CREDENTIALS.password);
  };

  return (
    <Card className="max-w-sm mx-auto shadow-md" hover={false}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Login</h2>
        
        {/* Sección de Credenciales de Prueba */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Credenciales de Prueba:</p>
          
          {/* Email */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Email:</p>
              <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{TEST_CREDENTIALS.email}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(TEST_CREDENTIALS.email, "email")}
              className="ml-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              title="Copiar email"
            >
              {copiedField === "email" ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          
          {/* Password */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Senha:</p>
              <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{TEST_CREDENTIALS.password}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(TEST_CREDENTIALS.password, "password")}
              className="ml-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              title="Copiar senha"
            >
              {copiedField === "password" ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
          
          {/* Botón para llenar automáticamente */}
          <button
            type="button"
            onClick={fillCredentials}
            className="w-full mt-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 py-2 rounded transition-colors font-medium"
          >
            Usar Credenciales de Prueba
          </button>
        </div>

        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert variant="error">
            Credenciais inválidas
          </Alert>
        )}
        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          className="w-full"
        >
          Entrar
        </Button>
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Esqueci minha senha
        </Link>
      </form>
    </Card>
  );
}
