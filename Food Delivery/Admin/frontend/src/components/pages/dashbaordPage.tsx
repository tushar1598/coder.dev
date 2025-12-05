import React from "react";
import { MetricsGrid } from "../dashbaord/matricGrid";
import { Chart } from "../dashbaord/chart";
import { RecentActivity } from "../dashbaord/recentActivity";
import {
  ShoppingBag,
  DollarSign,
  Utensils,
  TrendingUp,
  UserPlus,
  Package,
} from "lucide-react";

export const DashboardPage: React.FC = () => {
  const metrics = [
    {
      title: "Total Orders",
      value: "2,543",
      change: "+12.5% from last month",
      isPositive: true,
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2% from last month",
      isPositive: true,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Active Restaurants",
      value: "573",
      change: "-2.4% from last month",
      isPositive: false,
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      title: "Growth Rate",
      value: "24.5%",
      change: "+4.1% from last month",
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const chartData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 300 },
    { month: "Mar", value: 600 },
    { month: "Apr", value: 800 },
    { month: "May", value: 500 },
    { month: "Jun", value: 750 },
  ];

  const activities = [
    {
      text: "New order received",
      time: "1 hour ago",
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
    },
    {
      text: "Restaurant partner added",
      time: "2 hours ago",
      icon: <Utensils className="w-5 h-5 text-blue-600" />,
    },
    {
      text: "New user registered",
      time: "3 hours ago",
      icon: <UserPlus className="w-5 h-5 text-blue-600" />,
    },
    {
      text: "Delivery completed",
      time: "4 hours ago",
      icon: <Package className="w-5 h-5 text-blue-600" />,
    },
    {
      text: "New user registered",
      time: "5 hours ago",
      icon: <UserPlus className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your food delivery application metrics
        </p>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart data={chartData} title="Overview" />
        </div>
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};
