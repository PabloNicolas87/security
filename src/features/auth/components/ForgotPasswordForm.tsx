import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { Link } from "react-router-dom";

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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
        <h2 className="text-2xl font-semibold text-center">Recuperar senha</h2>
        <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
        />

        {error && (
            <p className="text-red-500 text-sm text-center">
            {(error as Error).message}
            </p>
        )}
        {isSuccess && (
            <div className="text-center space-y-2">
                <p className="text-green-600 text-sm">
                E-mail enviado com sucesso! Verifique sua caixa de entrada.
                </p>

                {/* 🔹 Simulación visual del link del e-mail */}
                <Link
                to="/reset-password"
                className="text-sm text-blue-600 hover:underline block"
                >
                Simular link recebido por e-mail
                </Link>
            </div>
        )}


        <button
            type="submit"
            disabled={!validateEmail(email) || isPending}
            className={`w-full py-2 rounded text-white font-medium ${
                validateEmail(email)
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            >
            {isPending ? "Enviando..." : "Enviar e-mail"}
        </button>

        <p className="text-xs text-gray-500 text-center">
            Você receberá um link de redefinição de senha no e-mail informado.
        </p>


        <div className="text-center">
            <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline"
            >
                Voltar para login
            </Link>
        </div>
    </form>
  );
}
