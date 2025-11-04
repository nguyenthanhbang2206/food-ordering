import React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Box,
  useTheme,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  BarChart,
} from "recharts";
import { useNavigate } from "react-router-dom";

// ------- Mock data (fallback) -------
const MOCK_STATS = {
  totalFoods: 3,
  totalOrders: 6,
  totalRevenue: 90,
  totalReviews: 0,
  averageRating: 0.0,
  todayOrders: 0,
  todayRevenue: null,
  orderStatus: [
    { name: "PENDING", value: 4 },
    { name: "DELIVERED", value: 2 },
  ],
  topFoods: [
    { name: "banh mỳ", sold: 1 },
    { name: "Cơm Gà", sold: 2 },
    { name: "best seller", sold: 11 },
  ],
  revenueByMonth: [{ month: 8, revenue: 450 }],
  recentOrders: [],
};
const API_URL = process.env.REACT_APP_API_URL;
const CHART_COLORS = ["#2563EB", "#F9A826", "#00C49F", "#FF444A"];
const formatCurrency = (value) =>
  typeof value === "number"
    ? value.toLocaleString(undefined, { minimumFractionDigits: 0 })
    : "0";

export const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [stats, setStats] = React.useState(null);
  const [recentOrders, setRecentOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingOrders, setLoadingOrders] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/v1/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 4000,
        });
        if (mounted) {
          // Map API response to expected structure
          const d = res.data.data;
          setStats({
            totalFoods: d.totalFoods,
            totalOrders: d.totalOrders,
            totalRevenue: d.totalRevenue,
            totalReviews: d.totalReviews,
            averageRating: d.averageRating,
            todayOrders: d.todayOrders,
            todayRevenue: d.todayRevenue,
            orderStatus: (d.orderStatus || []).reduce((acc, curr) => {
              // Gộp các trạng thái trùng tên
              const found = acc.find((item) => item.name === curr.name);
              if (found) found.value += curr.value;
              else acc.push({ ...curr });
              return acc;
            }, []),
            topFoods: (d.topFoods || []).map((f) => ({
              name: f.name,
              sold: f.sold,
            })),
            revenueByMonth: (d.revenueByMonth || []).map((r) => ({
              month: typeof r.month === "number" ? `Tháng ${r.month}` : r.month,
              revenue: r.revenue,
            })),
            recentOrders: d.recentOrders || [],
          });
        }
      } catch (err) {
        if (mounted) {
          setError("Không thể kết nối tới server — hiển thị dữ liệu mẫu.");
          setTimeout(() => {
            if (mounted) setStats(MOCK_STATS);
          }, 600);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const orderStatus = stats?.orderStatus || MOCK_STATS.orderStatus;
  const topFoods = stats?.topFoods || MOCK_STATS.topFoods;
  const revenueByMonth = stats?.revenueByMonth || MOCK_STATS.revenueByMonth;

  const handleTopFoodClick = (data) => {
    if (!data) return;
    navigate(`/admin/restaurant/foods?q=${encodeURIComponent(data.name)}`);
  };


  React.useEffect(() => {
    let mounted = true;
    const fetchRecentOrders = async () => {
      setLoadingOrders(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/v1/admin/restaurants/orders/recently`,
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 4000,
          }
        );
        if (mounted) {
          setRecentOrders(
            (res.data.data || []).map((order) => ({
              id: order.id,
              customer:
                order.customer?.fullName || order.customer?.email || "N/A",
              food:
                order.orderItems && order.orderItems.length > 0
                  ? order.orderItems
                      .map((item) => item.foodName || item.food?.name)
                      .join(", ")
                  : "",
              total: order.totalPrice,
              status: order.status,
              date: order.createdDate
                ? new Date(order.createdDate).toLocaleString()
                : "",
            }))
          );
        }
      } catch {
        if (mounted) setRecentOrders([]);
      } finally {
        if (mounted) setLoadingOrders(false);
      }
    };
    fetchRecentOrders();
    return () => {
      mounted = false;
    };
  }, []);

  const statusColor = (status) =>
    status === "Completed"
      ? "text-green-600"
      : status === "Pending" || status === "PENDING"
      ? "text-yellow-600"
      : status === "Processing"
      ? "text-blue-600"
      : status === "Delivered" || status === "DELIVERED"
      ? "text-green-700"
      : "text-red-600";

  // Fix: Make chartData unique for each bar (even with duplicate names)
  const chartData = topFoods.map((item, idx) => ({
    ...item,
    label: `${item.name} (${idx + 1})`, // unique label for each bar
    _originalName: item.name, // keep original name for tooltip
  }));

  // Custom tooltip to show correct name and sold value
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { _originalName, sold } = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
          <div>
            <strong>{_originalName}</strong>
          </div>
          <div>Sold: {sold}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6E6FA] to-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2563EB] mb-4">
          Restaurant Dashboard
        </h1>
        <Divider className="mb-6" />
        {error && (
          <Box mb={2}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}
        {/* Quick actions */}
        <Card className="mb-6 shadow-sm">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outlined"
                startIcon={<FastfoodIcon />}
                onClick={() => navigate("/admin/restaurant/food")}
              >
                Manage Foods
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                onClick={() => navigate("/admin/restaurant/orders")}
              >
                Manage Orders
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Stats grid */}
        <Grid container spacing={3}>
          {[
            {
              title: "Total Foods",
              icon: <FastfoodIcon />,
              value: loading
                ? null
                : stats?.totalFoods ?? MOCK_STATS.totalFoods,
            },
            {
              title: "Total Orders",
              icon: <ShoppingCartIcon />,
              value: loading
                ? null
                : stats?.totalOrders ?? MOCK_STATS.totalOrders,
              sub: loading
                ? null
                : `Today: ${stats?.todayOrders ?? MOCK_STATS.todayOrders}`,
            },
            {
              title: "Revenue",
              icon: <BarChartIcon />,
              value:
                loading || stats?.totalRevenue == null
                  ? null
                  : `${formatCurrency(stats.totalRevenue)}đ`,
              sub:
                loading || stats?.todayRevenue == null
                  ? null
                  : `Today: ${formatCurrency(stats.todayRevenue)}đ`,
            },
            {
              title: "Reviews",
              icon: <RateReviewIcon />,
              value: loading
                ? null
                : stats?.totalReviews ?? MOCK_STATS.totalReviews,
              sub: loading
                ? null
                : `Avg: ${(
                    stats?.averageRating ?? MOCK_STATS.averageRating
                  ).toFixed(1)}/5`,
            },
          ].map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card className="shadow">
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    <span className="align-middle mr-2">{card.icon}</span>{" "}
                    {card.title}
                  </Typography>
                  {loading ? (
                    <>
                      <Skeleton width="60%" height={34} />
                      <Skeleton width="40%" />
                    </>
                  ) : (
                    <>
                      <Typography variant="h4" className="font-bold">
                        {card.value ?? "—"}
                      </Typography>
                      {card.sub && (
                        <Typography variant="body2" color="textSecondary">
                          {card.sub}
                        </Typography>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Charts: 2 chart nằm ngang, 1 chart nằm riêng 1 hàng */}
        {/* Order Status & Top Foods trên cùng 1 hàng */}
        <Grid item xs={12}>
          <Card className="shadow-lg h-full flex flex-col mt-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <BarChartIcon className="mr-2" /> Order Status
              </Typography>
              <div style={{ width: "100%", minWidth: 500, height: 360 }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={340} />
                ) : (
                  <ResponsiveContainer width="100%" height={340}>
                    <PieChart>
                      <Pie
                        data={orderStatus}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                      >
                        {orderStatus.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ReTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              {!loading && (
                <Typography
                  variant="caption"
                  className="block mt-2 text-gray-600"
                >
                  Click a slice to view filtered orders.
                </Typography>
              )}
            </CardContent>
          </Card>{" "}
        </Grid>
        <Grid item xs={12}>
          <Card className="shadow-lg h-full flex flex-col mt-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FastfoodIcon className="mr-2" /> Top Foods
              </Typography>
              <div style={{ width: "100%", minWidth: 500, height: 360 }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={340} />
                ) : (
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart
                      data={chartData}
                      margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <ReTooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="sold"
                        onClick={(data) => handleTopFoodClick(data)}
                      >
                        {chartData.map((entry, i) => (
                          <Cell
                            key={`cell-${i}`}
                            fill={CHART_COLORS[i % CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              {!loading && (
                <Typography
                  variant="caption"
                  className="block mt-2 text-gray-600"
                >
                  Click a bar to view foods filtered by name.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Revenue by Month nằm riêng 1 hàng */}
        <Grid item xs={12}>
          <Card className="shadow-lg h-full flex flex-col mt-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <BarChartIcon className="mr-2" /> Revenue by Month
              </Typography>
              <div style={{ width: "100%", minWidth: 900, height: 400 }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={380} />
                ) : (
                  <ResponsiveContainer width="100%" height={380}>
                    <LineChart data={revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ReTooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke={theme.palette.warning.main}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders Table */}
        <div className="mt-8">
          <Typography variant="h6" className="font-bold mb-4 text-[#2563EB]">
            Recent Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Total (đ)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingOrders
                  ? Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Skeleton width="60px" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="120px" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="100px" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="60px" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="80px" />
                        </TableCell>
                        <TableCell>
                          <Skeleton width="140px" />
                        </TableCell>
                      </TableRow>
                    ))
                  : recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.food}</TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <span
                            className={`${statusColor(
                              order.status
                            )} font-semibold`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
