export function ChatUserList() {
  const users = ["Você", "Agent01", "Agent02", "System"];
  return (
    <div className="border rounded-lg p-3 bg-white dark:bg-gray-800">
      <h3 className="font-medium mb-2 dark:text-white">Usuários online</h3>
      <ul className="text-sm text-gray-600 dark:text-gray-300">
        {users.map((u) => (
          <li key={u}>• {u}</li>
        ))}
      </ul>
    </div>
  );
}
