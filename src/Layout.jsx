import { Outlet } from "react-router-dom";
import { Sidebar } from "./Component/Sidebar/Sidebar";
import { Header } from "./Component/Header/Header";
import { useState, useCallback, useEffect } from "react";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "auto";
  }, [mobileSidebarOpen]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header toggleMobileSidebar={toggleMobileSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            isCollapsed={sidebarOpen}
            onToggleCollapse={toggleSidebar}
            isMobile={false}
          />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
          />
          <div className="relative flex h-full w-64 z-50">
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={toggleMobileSidebar}
              isMobile={true}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto  md:p-6 bg-gray-50 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
