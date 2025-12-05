import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { DashboardPage } from "../components/pages/dashbaordPage";
import { OrdersPage } from "../components/pages/orderPage";
import { RestaurantsPage } from "../components/pages/restaurants/restaurentPage";
import { MenuPage } from "../components/pages/menuPage";
import { UsersPage } from "../components/pages/userPage";
import { DeliveryPage } from "../components/pages/deliveryPage";
import { AnalyticsPage } from "../components/pages/analyticsPage";
import { SettingsPage } from "../components/pages/settingPage";
import LoginPage from "../components/auth/login";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

{
  /* <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout> */
}
