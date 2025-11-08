import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 border-b border-gray-200">
      <h1 className="text-lg font-semibold text-gray-700">
        Painel de Segurança
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-600">
              Olá, <strong>{user.name}</strong>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
            >
              <LogOut size={16} />
              Sair
            </button>
          </>
        )}
      </div>
    </header>
  );
}
