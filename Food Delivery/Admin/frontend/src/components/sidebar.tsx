import React from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Package,
  ShoppingBag,
  Utensils,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void; // Used only for mobile modal
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onClose }) => {
  const location = useLocation();

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      label: "Restaurants",
      path: "/restaurants",
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: "Menu Items",
      path: "/menu",
    },
    { icon: <Users className="w-5 h-5" />, label: "Users", path: "/users" },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Delivery",
      path: "/delivery",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={`
        bg-white border-r border-gray-200 h-full transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Mobile close button */}
      {onClose && (
        <div className="flex justify-end p-4 md:hidden">
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
      )}

      {/* Logo */}
      <div className={`p-6 ${collapsed ? "text-center" : ""}`}>
        {!collapsed && (
          <h1 className="text-xl font-bold">Food Delivery Admin</h1>
        )}
      </div>

      {/* Navigation items */}
      <nav className="px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition font-medium
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
