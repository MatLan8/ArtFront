import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface VendorStats {
  vendorId: string;
  totalArtworksCreated: number;
  totalArtworksSold: number;
  totalRevenue: number;
  averagePrice: number;
}

export const useGetVendorStats = (vendorId: string) => {
  return useQuery<VendorStats, Error>({
    queryKey: ["vendorStats", vendorId],
    queryFn: async () => {
      const { data } = await axios.get<VendorStats>(
        `${import.meta.env.VITE_BASE_URL}/Vendor/Stats/${vendorId}`
      );
      return data;
    },
    enabled: !!vendorId,
  });
};
