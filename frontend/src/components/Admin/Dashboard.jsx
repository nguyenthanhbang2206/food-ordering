import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
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

// Giả dữ liệu thống kê
const stats = {
  restaurant: {
    name: "Pizza House",
    owner: "Nguyễn Thanh Bằng",
    address: "123 Main St, District 1, HCMC",
    phone: "0123 456 789",
    email: "pizza@house.com",
    image: "/default-restaurant.jpg",
    openingHours: "08:00 - 22:00",
    open: true,
  },
  totalFoods: 42,
  totalOrders: 320,
  totalRevenue: 12500,
  totalReviews: 88,
  averageRating: 4.6,
  totalCustomers: 210,
  todayOrders: 12,
  todayRevenue: 480,
  orderStatus: [
    { name: "Pending", value: 8 },
    { name: "Processing", value: 3 },
    { name: "Completed", value: 295 },
    { name: "Cancelled", value: 14 },
  ],
  topFoods: [
    { name: "Pizza", orders: 80 },
    { name: "Burger", orders: 65 },
    { name: "Sushi", orders: 50 },
    { name: "Pho", orders: 40 },
    { name: "Salad", orders: 30 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 800 },
    { month: "Feb", revenue: 1200 },
    { month: "Mar", revenue: 1500 },
    { month: "Apr", revenue: 1100 },
    { month: "May", revenue: 1700 },
    { month: "Jun", revenue: 2000 },
    { month: "Jul", revenue: 2200 },
    { month: "Aug", revenue: 1800 },
    { month: "Sep", revenue: 1600 },
    { month: "Oct", revenue: 2100 },
    { month: "Nov", revenue: 2300 },
    { month: "Dec", revenue: 2500 },
  ],
  recentOrders: [
    {
      id: 101,
      customer: "Nguyễn Văn A",
      food: "Pizza",
      total: 15,
      status: "Completed",
      date: "2025-08-01 12:30",
    },
    {
      id: 102,
      customer: "Trần Thị B",
      food: "Burger",
      total: 10,
      status: "Pending",
      date: "2025-08-02 13:10",
    },
    {
      id: 103,
      customer: "Lê Văn C",
      food: "Sushi",
      total: 20,
      status: "Completed",
      date: "2025-08-03 14:00",
    },
    {
      id: 104,
      customer: "Phạm Thị D",
      food: "Pho",
      total: 8,
      status: "Processing",
      date: "2025-08-03 15:20",
    },
    {
      id: 105,
      customer: "Ngô Văn E",
      food: "Salad",
      total: 7,
      status: "Cancelled",
      date: "2025-08-04 16:00",
    },
  ],
};

const COLORS = ["#5A20CB", "#F9A826", "#00C49F", "#FF444A"];

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6E6FA] to-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-[#5A20CB] mb-6">
          Restaurant Dashboard
        </h1>
        <Divider className="mb-8" />

        {/* Thông tin nhà hàng */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <Avatar
              src={stats.restaurant.image}
              alt={stats.restaurant.name}
              sx={{ width: 100, height: 100 }}
            />
            <div className="flex-1">
              <Typography variant="h5" className="font-bold mb-1">
                {stats.restaurant.name}
              </Typography>
              <Typography variant="body1" className="mb-1">
                <strong>Owner:</strong> {stats.restaurant.owner}
              </Typography>
              <Typography variant="body1" className="mb-1 flex items-center">
                <LocationOnIcon className="mr-1" />
                {stats.restaurant.address}
              </Typography>
              <Typography variant="body1" className="mb-1">
                <strong>Phone:</strong> {stats.restaurant.phone}
              </Typography>
              <Typography variant="body1" className="mb-1">
                <strong>Email:</strong> {stats.restaurant.email}
              </Typography>
              <Typography variant="body1" className="mb-1">
                <strong>Opening Hours:</strong> {stats.restaurant.openingHours}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    stats.restaurant.open ? "text-green-600" : "text-red-600"
                  }
                >
                  {stats.restaurant.open ? "Open" : "Closed"}
                </span>
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin/restaurant/edit")}
              >
                Edit Info
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/admin/restaurant/foods/add")}
                startIcon={<AddCircleIcon />}
              >
                Add Food
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/admin/restaurant/foods/add")}
          >
            Add New Food
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RestaurantMenuIcon />}
            onClick={() => navigate("/admin/restaurant/foods")}
          >
            Manage Foods
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
            onClick={() => navigate("/admin/restaurant/orders")}
          >
            Manage Orders
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RateReviewIcon />}
            onClick={() => navigate("/admin/restaurant/reviews")}
          >
            View Reviews
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PeopleIcon />}
            onClick={() => navigate("/admin/restaurant/customers")}
          >
            Customers
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<BarChartIcon />}
            onClick={() => navigate("/admin/restaurant/statistics")}
          >
            Statistics
          </Button>
        </div>

        {/* Statistics Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <FastfoodIcon className="mr-2" /> Total Foods
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {stats.totalFoods}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <ShoppingCartIcon className="mr-2" /> Total Orders
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Today: {stats.todayOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <BarChartIcon className="mr-2" /> Revenue
                </Typography>
                <Typography variant="h4" className="font-bold text-green-600">
                  ${stats.totalRevenue?.toLocaleString() || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Today: ${stats.todayRevenue?.toLocaleString() || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <RateReviewIcon className="mr-2" /> Reviews
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {stats.totalReviews}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg. Rating: {stats.averageRating?.toFixed(1) || 0}/5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts & Top Foods */}
        <Grid container spacing={4} className="mt-4">
          {/* Pie Chart for Order Status */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <BarChartIcon className="mr-2" /> Order Status
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={stats.orderStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      label
                    >
                      {stats.orderStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          {/* Bar Chart for Top Foods */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <FastfoodIcon className="mr-2" /> Top Foods
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={stats.topFoods}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#5A20CB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          {/* Line Chart for Revenue by Month */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <BarChartIcon className="mr-2" /> Revenue by Month
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={stats.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F9A826"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Customers Card */}
        <Grid container spacing={4} className="mt-4">
          <Grid item xs={12} md={3}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <PeopleIcon className="mr-2" /> Customers
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {stats.totalCustomers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Orders Table */}
        <div className="mt-10">
          <Typography variant="h6" className="font-bold mb-4 text-[#5A20CB]">
            Recent Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Food</TableCell>
                  <TableCell>Total ($)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.food}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <span
                        className={
                          order.status === "Completed"
                            ? "text-green-600 font-semibold"
                            : order.status === "Pending"
                            ? "text-yellow-600 font-semibold"
                            : order.status === "Processing"
                            ? "text-blue-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
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
