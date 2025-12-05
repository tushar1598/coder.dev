import React from "react";
import { ActivityItem } from "./activityItems";

interface ActivityItemProps {
  text: string;
  time: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps {
  activities: ActivityItemProps[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};
