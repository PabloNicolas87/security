import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import type { LoginResponse } from "../../types";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await axios.get(
    `${API_ENDPOINTS.USERS}?email=${email}`
  );

  if (!data.length || data[0].password !== password) {
    throw new Error("Credenciais inválidas");
  }

  return {
    token: data[0].token,
    user: {
      id: data[0].id,
      name: data[0].name,
      email: data[0].email,
    },
  };
};

export const forgotPassword = async (
  email: string
): Promise<{ ok: boolean; message: string }> => {
  const { data } = await axios.get(
    `${API_ENDPOINTS.USERS}?email=${email}`
  );

  if (!data.length) {
    throw new Error("E-mail não encontrado");
  }

  console.log(`Simulando envio de e-mail para ${email}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { ok: true, message: "E-mail de recuperação enviado" };
};

export const resetPassword = async (
  newPassword: string
): Promise<{ ok: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const strong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  if (!strong.test(newPassword)) {
    throw new Error("A senha não atende aos requisitos mínimos");
  }

  console.log("Senha redefinida com sucesso!");
  return { ok: true };
};
