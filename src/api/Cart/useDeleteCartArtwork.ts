import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCartArtwork = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (cartArtworkId: string) => {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/Cart/DeleteCartArtwork/${cartArtworkId}`
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
