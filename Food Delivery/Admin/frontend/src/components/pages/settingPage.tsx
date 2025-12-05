import React from "react";
import { Settings } from "lucide-react";

export const SettingsPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your application settings</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Settings Module
        </h2>
        <p className="text-gray-600">Settings functionality coming soon</p>
      </div>
    </div>
  );
};
