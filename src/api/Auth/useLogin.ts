import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../../types/Auth";

export interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<User, Error, LoginRequest>({
    mutationFn: async (payload) => {
      const { data } = await axios.get<User>(
        `${import.meta.env.VITE_BASE_URL}/Auth/Login`,
        { params: payload }
      );
      return data;
    },
  });
};