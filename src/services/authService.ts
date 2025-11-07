import axios from "axios";

const API_URL = "http://localhost:4000";

export const login = async (email: string, password: string) => {
  const { data } = await axios.get(`${API_URL}/users?email=${email}`);

  if (!data.length || data[0].password !== password) {
    throw new Error("Credenciais inválidas");
  }

  // simula retorno de una API real
  return {
    token: data[0].token,
    user: {
      id: data[0].id,
      name: data[0].name,
      email: data[0].email,
    },
  };
};

// 🔹 Simula Nueva función 
export const forgotPassword = async (email: string) => {
  const { data } = await axios.get(`${API_URL}/users?email=${email}`);

  if (!data.length) {
    throw new Error("E-mail não encontrado");
  }

  // simula el envío de correo
  console.log(`Simulando envio de e-mail para ${email}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { ok: true, message: "E-mail de recuperação enviado" };
};

export const resetPassword = async (newPassword: string) => {
  // simula llamada al backend
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // verifica reglas mínimas
  const strong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  if (!strong.test(newPassword)) {
    throw new Error("A senha não atende aos requisitos mínimos");
  }

  console.log("Senha redefinida com sucesso!");
  return { ok: true };
};
