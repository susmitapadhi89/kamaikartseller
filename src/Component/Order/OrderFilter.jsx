// OrderFilters.jsx
import { useState } from "react";

const OrderFilters = ({ onFilterChange, onBulkAction, selectedCount }) => {
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });

  const handleStatusChange = (status) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    const newFilters = { ...filters, search };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const statusOptions = [
    { value: "all", label: "All Orders", color: "gray" },
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "confirmed", label: "Confirmed", color: "indigo" },
    { value: "shipped", label: "Shipped", color: "blue" },
    { value: "delivered", label: "Delivered", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" },
  ];

  const colorClasses = {
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300",
    yellow:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300",
    indigo:
      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-300",
    blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300",
    green: "bg-green-100 text-green-800 hover:bg-green-200 border-green-300",
    red: "bg-red-100 text-red-800 hover:bg-red-200 border-red-300",
  };

  const activeClasses = {
    gray: "bg-gray-600 text-white border-gray-600",
    yellow: "bg-yellow-600 text-white border-yellow-600",
    indigo: "bg-indigo-600 text-white border-indigo-600",
    blue: "bg-blue-600 text-white border-blue-600",
    green: "bg-green-600 text-white border-green-600",
    red: "bg-red-600 text-white border-red-600",
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search orders by ID, customer, or product..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                filters.status === option.value
                  ? activeClasses[option.color]
                  : colorClasses[option.color]
              }`}
              onClick={() => handleStatusChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <div className="relative">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors">
                <span>Actions ({selectedCount})</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 hidden">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onBulkAction("mark_confirmed")}
                  >
                    Mark as Confirmed
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onBulkAction("mark_shipped")}
                  >
                    Mark as Shipped
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onBulkAction("mark_delivered")}
                  >
                    Mark as Delivered
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
