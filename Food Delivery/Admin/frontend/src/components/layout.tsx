import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile modal

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Mobile → modal
      setMobileOpen(true);
    } else {
      // Desktop → collapse
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar Modal */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-in Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 md:hidden animate-slideIn">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Header
          title="Food Delivery Admin Dashboard"
          onToggleSidebar={handleToggleSidebar}
        />
        {children}
      </div>
    </div>
  );
};
