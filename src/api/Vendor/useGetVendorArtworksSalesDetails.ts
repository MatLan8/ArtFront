import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ArtworkSalesDetail {
  artworkId: string;
  name: string;
  price: number;
  totalSold: number;
  totalRevenue: number;
  author: string;
  createdAt: string;
}

export const useGetVendorArtworksSalesDetails = (vendorId: string) => {
  return useQuery<ArtworkSalesDetail[], Error>({
    queryKey: ["vendorArtworksSalesDetails", vendorId],
    queryFn: async () => {
      const { data } = await axios.get<ArtworkSalesDetail[]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Vendor/ArtworksSalesDetails/${vendorId}`
      );
      return data;
    },
    enabled: !!vendorId,
  });
};
