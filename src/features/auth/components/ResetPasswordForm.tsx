import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { Link, useNavigate } from "react-router-dom";

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
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        Redefinir senha
      </h2>

      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => {
          const val = e.target.value;
          setPassword(val);
          checkStrength(val);
        }}
        className="w-full border p-2 rounded"
      />

      {/* 🔹 Requisitos dinámicos */}
      <ul className="text-xs text-gray-600 space-y-1">
        <li className={rules.lower ? "text-green-600" : "text-gray-500"}>
          • Pelo menos uma letra minúscula
        </li>
        <li className={rules.upper ? "text-green-600" : "text-gray-500"}>
          • Pelo menos uma letra maiúscula
        </li>
        <li className={rules.number ? "text-green-600" : "text-gray-500"}>
          • Pelo menos um número
        </li>
        <li className={rules.length ? "text-green-600" : "text-gray-500"}>
          • Mínimo 8 caracteres
        </li>
      </ul>

      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* 🔹 Mensajes */}
      {password && confirm && password !== confirm && (
        <p className="text-red-500 text-xs text-center">
          As senhas não coincidem
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center">
          {(error as Error).message}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-600 text-sm text-center">
          Senha redefinida com sucesso!
        </p>
      )}

      {/* 🔹 Botón principal */}
      <button
        type="submit"
        disabled={!allValid || isPending}
        className={`w-full py-2 rounded text-white font-medium ${
          allValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isPending ? "Salvando..." : "Salvar nova senha"}
      </button>

      <div className="text-center">
      <p className="text-xs text-gray-500 text-center">
  Se você não deseja alterar sua senha agora,{" "}
  <Link to="/login" className="text-blue-600 hover:underline">
    volte para o login
  </Link>.
</p>

      </div>
    </form>
  );
}
