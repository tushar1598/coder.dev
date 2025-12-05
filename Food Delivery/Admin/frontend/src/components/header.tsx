import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Menu
          className="w-6 h-6 text-gray-600 cursor-pointer"
          onClick={onToggleSidebar}
        />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
    </header>
  );
};
