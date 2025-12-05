import React from "react";
import { Package } from "lucide-react";

export const MenuPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Menu Items Management
        </h1>
        <p className="text-gray-600">
          Manage food items, prices, and availability
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Menu Items Module
        </h2>
        <p className="text-gray-600">
          Menu management functionality coming soon
        </p>
      </div>
    </div>
  );
};
