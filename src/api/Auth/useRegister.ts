// api/Auth/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../../types/Auth";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export const useRegister = () => {
  return useMutation<User, Error, RegisterRequest>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<User>(
        `${import.meta.env.VITE_BASE_URL}/Auth/Register`,
        payload
      );
      return data;
    },
  });
};