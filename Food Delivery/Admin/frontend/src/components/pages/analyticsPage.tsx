import React from "react";
import { BarChart3 } from "lucide-react";

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">View detailed analytics and insights</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analytics Module
        </h2>
        <p className="text-gray-600">
          Advanced analytics functionality coming soon
        </p>
      </div>
    </div>
  );
};
