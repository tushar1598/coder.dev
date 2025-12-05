import React from "react";
import { UserPlus } from "lucide-react";

interface ActivityItemProps {
  text: string;
  time: string;
  icon?: React.ReactNode;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  text,
  time,
  icon,
}) => {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        {icon || <UserPlus className="w-5 h-5 text-blue-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{text}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
};
