import { useMemo, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetVendorSalesReport } from "../../api/Vendor/useGetVendorSalesReport";
import { useGetVendorArtworksSalesDetails } from "../../api/Vendor/useGetVendorArtworksSalesDetails";
import { useGetVendorStats } from "../../api/Vendor/useGetVendorStats";
import { Download } from "lucide-react";
import styles from "./ProfitsReport.module.css";

function ProfitsReport() {
  // Get vendor ID from sessionStorage
  const vendorId = sessionStorage.getItem("userId") || "";
  const reportRef = useRef<HTMLDivElement>(null);

  // Fetch vendor-specific data
  const {
    data: salesReport,
    isLoading: reportLoading,
    error: reportError,
  } = useGetVendorSalesReport(vendorId);

  const {
    data: artworkDetails,
    isLoading: detailsLoading,
    error: detailsError,
  } = useGetVendorArtworksSalesDetails(vendorId);

  const {
    data: vendorStats,
    isLoading: statsLoading,
    error: statsError,
  } = useGetVendorStats(vendorId);

  const isLoading = reportLoading || detailsLoading || statsLoading;
  const error = reportError || detailsError || statsError;

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#ffa726",
    "#29b6f6",
  ];

  // Sort artworks by revenue for performance chart
  const topArtworks = useMemo(() => {
    return (artworkDetails || [])
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10);
  }, [artworkDetails]);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Dynamic import to avoid issues if not needed
      const html2pdf = await import("html2pdf.js");

      const element = reportRef.current;
      const options = {
        margin: 10,
        filename: `Profits-Report-${
          new Date().toISOString().split("T")[0]
        }.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" as const, unit: "mm", format: "a4" },
      };

      html2pdf.default().set(options).from(element).save();
    } catch (err) {
      console.error("Error exporting PDF:", err);
      alert("Failed to export PDF. Please try again.");
    }
  };

  if (!vendorId) {
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          <div className={styles.title}>Profits Report</div>
          <div className={styles.divider} />
          <div className={styles.errorMessage}>
            You need to be logged in as a vendor to view the profits report.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          <div className={styles.title}>Profits Report</div>
          <div className={styles.divider} />
          <div className={styles.loadingMessage}>
            Loading your sales data...
          </div>
        </div>
      </div>
    );
  }

  if (error || !salesReport) {
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          <div className={styles.title}>Profits Report</div>
          <div className={styles.divider} />
          <div className={styles.errorMessage}>Error loading sales data</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.titleSection}>
          <div className={styles.title}>Your Profits Report</div>
          <button onClick={handleExportPDF} className={styles.exportButton}>
            <Download size={20} />
            Export as PDF
          </button>
        </div>
        <div className={styles.divider} />

        <div ref={reportRef}>
          {/* Key Metrics Section */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Total Revenue</div>
              <div className={styles.metricValue}>
                ${salesReport.totalRevenue.toFixed(2)}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Total Sold Artworks</div>
              <div className={styles.metricValue}>
                {salesReport.totalSoldArtworks}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Average Price</div>
              <div className={styles.metricValue}>
                ${salesReport.averagePrice.toFixed(2)}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Created Artworks</div>
              <div className={styles.metricValue}>
                {vendorStats?.totalArtworksCreated || 0}
              </div>
            </div>
          </div>

          {/* Best Performers Section */}
          {salesReport.highestPricedArt && (
            <div className={styles.performersSection}>
              <h3>Top Performers</h3>
              <div className={styles.performersList}>
                <div className={styles.performerCard}>
                  <div className={styles.performerLabel}>Highest Priced</div>
                  <div className={styles.performerName}>
                    {salesReport.highestPricedArt.name}
                  </div>
                  <div className={styles.performerStat}>
                    ${salesReport.highestPricedArt.price.toFixed(2)}
                  </div>
                  <div className={styles.performerSubtext}>
                    Sold {salesReport.highestPricedArt.soldCount} time(s)
                  </div>
                </div>
                <div className={styles.performerCard}>
                  <div className={styles.performerLabel}>Most Popular</div>
                  <div className={styles.performerName}>
                    {salesReport.mostPopularArt.name}
                  </div>
                  <div className={styles.performerStat}>
                    ${salesReport.mostPopularArt.revenue.toFixed(2)}
                  </div>
                  <div className={styles.performerSubtext}>
                    Sold {salesReport.mostPopularArt.soldCount} time(s)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className={styles.chartsContainer}>
            {/* Monthly Trend Chart */}
            {salesReport.monthlySalesData &&
              salesReport.monthlySalesData.length > 0 && (
                <div className={styles.chartWrapper}>
                  <h3>Monthly Sales Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesReport.monthlySalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        name="Revenue ($)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="soldCount"
                        stroke="#82ca9d"
                        name="Units Sold"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

            {/* Price Distribution Chart */}
            {salesReport.priceDistribution &&
              salesReport.priceDistribution.length > 0 && (
                <div className={styles.chartWrapper}>
                  <h3>Revenue by Price Range</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesReport.priceDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="revenue"
                        fill="#8884d8"
                        name="Revenue ($)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

            {/* Category Performance Pie Chart */}
            {salesReport.categoryPerformance &&
              salesReport.categoryPerformance.length > 0 && (
                <div className={styles.chartWrapper}>
                  <h3>Revenue by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={salesReport.categoryPerformance}
                        dataKey="revenue"
                        nameKey="categoryName"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {salesReport.categoryPerformance.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

            {/* Top Artworks Performance */}
            {topArtworks.length > 0 && (
              <div className={styles.chartWrapper}>
                <h3>Top Selling Artworks</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topArtworks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar
                      dataKey="totalRevenue"
                      fill="#82ca9d"
                      name="Revenue ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Recent Orders Table */}
          {salesReport.recentOrders && salesReport.recentOrders.length > 0 && (
            <div className={styles.tableContainer}>
              <h3>Recent Orders</h3>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Buyer</th>
                    <th>Artwork</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReport.recentOrders.map((order, idx) => (
                    <tr key={idx}>
                      <td>{order.buyerName}</td>
                      <td>{order.artworkName}</td>
                      <td>${order.price.toFixed(2)}</td>
                      <td>{order.quantity}</td>
                      <td>${(order.price * order.quantity).toFixed(2)}</td>
                      <td>{new Date(order.soldDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfitsReport;
