import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface VendorSalesReport {
  totalRevenue: number;
  totalSoldArtworks: number;
  averagePrice: number;
  highestPricedArt: {
    name: string;
    price: number;
    soldCount: number;
  };
  mostPopularArt: {
    name: string;
    soldCount: number;
    revenue: number;
  };
  priceDistribution: Array<{
    range: string;
    count: number;
    revenue: number;
  }>;
  monthlySalesData: Array<{
    month: string;
    revenue: number;
    soldCount: number;
  }>;
  categoryPerformance: Array<{
    categoryName: string;
    soldCount: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    orderId: string;
    buyerName: string;
    artworkName: string;
    price: number;
    soldDate: string;
    quantity: number;
  }>;
}

export const useGetVendorSalesReport = (vendorId: string) => {
  return useQuery<VendorSalesReport, Error>({
    queryKey: ["vendorSalesReport", vendorId],
    queryFn: async () => {
      const { data } = await axios.get<VendorSalesReport>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Vendor/SalesReport?VendorId=${vendorId}`
      );
      return data;
    },
    enabled: !!vendorId,
  });
};
