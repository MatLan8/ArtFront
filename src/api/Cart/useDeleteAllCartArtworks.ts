import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteAllCartArtworks = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (clientId) => {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/Cart/DeleteAllCartArtworks/${clientId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllCartArtworksByClientId", clientId],
      });

      queryClient.invalidateQueries({
        queryKey: ["cartTotalSum", clientId],
      });

      queryClient.invalidateQueries({
        queryKey: ["cartAutomaticDiscount", clientId],
      });
    },
  });
};
