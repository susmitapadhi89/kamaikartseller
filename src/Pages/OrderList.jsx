// import React, { useState, useMemo } from "react";
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import {
//   FaEye,
//   FaSearch,
//   FaFilter,
//   FaChevronUp,
//   FaChevronDown,
//   FaPrint,
//   FaDownload,
//   FaBox,
//   FaShippingFast,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// // Import reusable components

// // Import static data
// import ordersData from "../../order.json";
// import { Pagination } from "../Component/Pagination/Pagination";
// import { DataTable } from "../Component/Table/ShowDataTable";

// export const SellerOrdersList = () => {
//   const navigate = useNavigate();

//   // State management
//   const [filters, setFilters] = useState({
//     searchTerm: "",
//     orderStatus: "All",
//     paymentStatus: "All",
//     dateFrom: "",
//     dateTo: "",
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });

//   // Table columns configuration
//   const orderColumns = [
//     {
//       key: "orderId",
//       title: "Order ID",
//       render: (order) => (
//         <div className="min-w-[120px]">
//           <div className="font-semibold text-gray-900">{order.id}</div>
//         </div>
//       ),
//     },
//     {
//       key: "customer",
//       title: "Customer",
//       render: (order) => (
//         <div className="min-w-[150px]">
//           <div className="font-medium text-gray-900">{order.customer.name}</div>
//           <div className="text-sm text-gray-500 truncate">
//             {order.customer.email}
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "products",
//       title: "Products & Amount",
//       render: (order) => (
//         <div className="min-w-[140px]">
//           <div className="flex items-center text-sm">
//             <FaBox className="text-gray-400 mr-2 w-3 h-3" />
//             <span className="font-medium">{order.itemsCount} items</span>
//           </div>
//           <div className="text-lg font-bold text-green-600">
//             ₹{order.totalAmount}
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "orderDate",
//       title: "Order Date ",

//       render: (order) => (
//         <div className="min-w-[140px]">
//           <div className="font-medium text-gray-900">
//             {new Date(order.orderDate).toLocaleDateString("en-IN")}
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "orderStatus",
//       title: "Order Status",
//       sortable: true,
//       render: (order) => {
//         const statusConfig = {
//           pending: {
//             color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
//             icon: FaClock,
//             label: "Pending",
//           },
//           confirmed: {
//             color: "bg-blue-100 text-blue-800 border border-blue-200",
//             icon: FaCheckCircle,
//             label: "Confirmed",
//           },
//           processing: {
//             color: "bg-purple-100 text-purple-800 border border-purple-200",
//             icon: FaBox,
//             label: "Processing",
//           },
//           shipped: {
//             color: "bg-indigo-100 text-indigo-800 border border-indigo-200",
//             icon: FaShippingFast,
//             label: "Shipped",
//           },
//           delivered: {
//             color: "bg-green-100 text-green-800 border border-green-200",
//             icon: FaCheckCircle,
//             label: "Delivered",
//           },
//           cancelled: {
//             color: "bg-red-100 text-red-800 border border-red-200",
//             icon: FaTimesCircle,
//             label: "Cancelled",
//           },
//         };

//         const config = statusConfig[order.orderStatus] || statusConfig.pending;
//         const IconComponent = config.icon;

//         return (
//           <div className="flex justify-center">
//             <span
//               className={`px-3 py-2 rounded-full text-xs font-medium capitalize flex items-center space-x-1 ${config.color}`}
//             >
//               <IconComponent className="w-3 h-3" />
//               <span>{config.label}</span>
//             </span>
//           </div>
//         );
//       },
//     },
//     {
//       key: "paymentStatus",
//       title: "Payment Status",
//       render: (order) => {
//         const paymentConfig = {
//           paid: { color: "bg-green-100 text-green-800", label: "Paid" },
//           pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
//           failed: { color: "bg-red-100 text-red-800", label: "Failed" },
//           refunded: { color: "bg-gray-100 text-gray-800", label: "Refunded" },
//         };

//         const config =
//           paymentConfig[order.paymentStatus] || paymentConfig.pending;

//         return (
//           <div className="flex flex-col space-y-1">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium text-center ${config.color}`}
//             >
//               {config.label}
//             </span>
//             <span className="text-xs text-gray-500 text-center">
//               {order.paymentMethod}
//             </span>
//           </div>
//         );
//       },
//     },
//     {
//       key: "actions",
//       title: "Actions",
//       render: (order) => (
//         <div className="flex space-x-2 justify-center">
//           <button
//             className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
//             onClick={() => handleViewOrder(order.id)}
//             title="View Order Details"
//           >
//             <FaEye className="w-4 h-4" />
//           </button>
//           <button
//             className="text-green-500 hover:text-green-700 transition-colors p-2 rounded-full hover:bg-green-50"
//             onClick={() => handleDownloadInvoice(order.id)}
//             title="Download Invoice"
//           >
//             <FaDownload className="w-4 h-4" />
//           </button>
//           <button
//             className="text-purple-500 hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
//             onClick={() => handlePrintOrder(order.id)}
//             title="Print Order"
//           >
//             <FaPrint className="w-4 h-4" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   // Filter and sort orders
//   const filteredAndSortedOrders = useMemo(() => {
//     let filtered = ordersData.orders;

//     // Apply search filter
//     if (filters.searchTerm) {
//       const searchLower = filters.searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (order) =>
//           order.orderNumber.toLowerCase().includes(searchLower) ||
//           order.customer.name.toLowerCase().includes(searchLower) ||
//           order.customer.email.toLowerCase().includes(searchLower) ||
//           order.id.toLowerCase().includes(searchLower)
//       );
//     }

//     // Apply status filter
//     if (filters.orderStatus !== "All") {
//       filtered = filtered.filter(
//         (order) => order.orderStatus === filters.orderStatus
//       );
//     }

//     // Apply payment status filter
//     if (filters.paymentStatus !== "All") {
//       filtered = filtered.filter(
//         (order) => order.paymentStatus === filters.paymentStatus
//       );
//     }

//     // Apply date filters
//     if (filters.dateFrom) {
//       filtered = filtered.filter(
//         (order) => new Date(order.orderDate) >= new Date(filters.dateFrom)
//       );
//     }

//     if (filters.dateTo) {
//       const toDate = new Date(filters.dateTo);
//       toDate.setHours(23, 59, 59, 999);
//       filtered = filtered.filter(
//         (order) => new Date(order.orderDate) <= toDate
//       );
//     }

//     // Apply sorting
//     if (sortConfig.field) {
//       filtered.sort((a, b) => {
//         let aValue = a[sortConfig.field];
//         let bValue = b[sortConfig.field];

//         // Handle nested objects
//         if (sortConfig.field === "customer") {
//           aValue = a.customer.name;
//           bValue = b.customer.name;
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   }, [filters, sortConfig]);

//   // Paginate orders
//   const paginatedOrders = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

//   // Calculate statistics
//   const statistics = useMemo(() => {
//     const totalOrders = filteredAndSortedOrders.length;
//     const pendingOrders = filteredAndSortedOrders.filter((order) =>
//       ["pending", "confirmed", "processing"].includes(order.orderStatus)
//     ).length;
//     const totalRevenue = filteredAndSortedOrders.reduce(
//       (sum, order) => sum + order.totalAmount,
//       0
//     );

//     return {
//       totalOrders,
//       pendingOrders,
//       totalRevenue,
//     };
//   }, [filteredAndSortedOrders]);

//   // Sort handler

//   // Status update handler
//   const handleStatusUpdate = (orderId, newStatus) => {
//     // In real app, this would dispatch to Redux
//     console.log(`Updating order ${orderId} to ${newStatus}`);
//     alert(`Order status updated to ${newStatus}`);
//   };

//   // View order details
//   const handleViewOrder = (orderId) => {
//     navigate(`/seller/order/orderlist/${orderId}`);
//   };

//   // Download invoice
//   const handleDownloadInvoice = (orderId) => {
//     console.log(`Downloading invoice for order ${orderId}`);
//     alert(`Invoice downloaded for order ${orderId}`);
//   };

//   // Print order
//   const handlePrintOrder = (orderId) => {
//     console.log(`Printing order ${orderId}`);
//     alert(`Printing order ${orderId}`);
//   };

//   // Filter handlers
//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//     setCurrentPage(1);
//   };

//   const resetFilters = () => {
//     setFilters({
//       searchTerm: "",
//       orderStatus: "All",
//       paymentStatus: "All",
//       dateFrom: "",
//       dateTo: "",
//     });
//     setCurrentPage(1);
//     setSortConfig({ field: "", direction: "asc" });
//   };

//   const handleItemsPerPageChange = (newItemsPerPage) => {
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Header Section */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div className="mb-6 lg:mb-0">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Orders Management
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage and track your customer orders efficiently
//           </p>
//         </div>

//         {/* Order Stats */}
//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
//             <div className="text-2xl font-bold text-blue-600">
//               {statistics.totalOrders}
//             </div>
//             <div className="text-sm text-gray-600 font-medium">
//               Total Orders
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
//             <div className="text-2xl font-bold text-orange-600">
//               {statistics.pendingOrders}
//             </div>
//             <div className="text-sm text-gray-600 font-medium">
//               Pending Orders
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
//             <div className="text-2xl font-bold text-green-600">
//               ₹{statistics.totalRevenue}
//             </div>
//             <div className="text-sm text-gray-600 font-medium">
//               Total Revenue
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           {/* Left side: Search and Filter */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
//             <div className="relative w-full md:w-80">
//               <input
//                 type="text"
//                 placeholder="Search orders by ID, customer, email..."
//                 className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={filters.searchTerm}
//                 onChange={(e) => updateFilter("searchTerm", e.target.value)}
//               />
//               <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>
//             <button
//               type="button"
//               className="border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 flex items-center justify-center whitespace-nowrap transition-colors font-medium"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <FaFilter className="mr-3" />
//               {showFilters ? "Hide Filters" : "Show Filters"}
//               {showFilters ? (
//                 <FaChevronUp className="ml-2" />
//               ) : (
//                 <FaChevronDown className="ml-2" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Filter Panel */}
//         {showFilters && (
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border rounded-lg bg-gray-50">
//             {/* Order Status Filter */}
//             <FormControl fullWidth size="medium">
//               <InputLabel>Order Status</InputLabel>
//               <Select
//                 value={filters.orderStatus}
//                 label="Order Status"
//                 onChange={(e) => updateFilter("orderStatus", e.target.value)}
//               >
//                 <MenuItem value="All">All Statuses</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//                 <MenuItem value="confirmed">Confirmed</MenuItem>
//                 <MenuItem value="processing">Processing</MenuItem>
//                 <MenuItem value="shipped">Shipped</MenuItem>
//                 <MenuItem value="delivered">Delivered</MenuItem>
//                 <MenuItem value="cancelled">Cancelled</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Payment Status Filter */}
//             <FormControl fullWidth size="medium">
//               <InputLabel>Payment Status</InputLabel>
//               <Select
//                 value={filters.paymentStatus}
//                 label="Payment Status"
//                 onChange={(e) => updateFilter("paymentStatus", e.target.value)}
//               >
//                 <MenuItem value="All">All Payments</MenuItem>
//                 <MenuItem value="paid">Paid</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//                 <MenuItem value="failed">Failed</MenuItem>
//                 <MenuItem value="refunded">Refunded</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Date From Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 value={filters.dateFrom}
//                 onChange={(e) => updateFilter("dateFrom", e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Date To Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 value={filters.dateTo}
//                 onChange={(e) => updateFilter("dateTo", e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Reset Button */}
//             <div className="flex items-end">
//               <button
//                 className="w-full border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
//                 onClick={resetFilters}
//               >
//                 Reset All Filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Pagination Controls - Top */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredAndSortedOrders.length / itemsPerPage)}
//         onPageChange={setCurrentPage}
//         itemsPerPage={itemsPerPage}
//         onItemsPerPageChange={handleItemsPerPageChange}
//         totalItems={filteredAndSortedOrders.length}
//         showItemsPerPage={true}
//       />

//       {/* Orders Table */}
//       <DataTable
//         columns={orderColumns}
//         data={paginatedOrders}
//         loading={false}
//         emptyMessage="No orders found matching your criteria. Try adjusting your filters."
//         sortField={sortConfig.field}
//         sortDirection={sortConfig.direction}
//       />
//     </div>
//   );
// };

// export default SellerOrdersList;
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  FaEye,
  FaSearch,
  FaFilter,
  FaChevronUp,
  FaChevronDown,
  FaPrint,
  FaDownload,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../Component/Pagination/Pagination";
import { DataTable } from "../Component/Table/ShowDataTable";
import { GetSellerOrders } from "../Redux/Features/OrderServiceSlice";

export const SellerOrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get orders from Redux store
  const { orders, loading, error } = useSelector(
    (state) => state.OrderOpration
  );

  // State management for UI
  const [filters, setFilters] = useState({
    searchTerm: "",
    orderStatus: "All",
    paymentStatus: "All",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(GetSellerOrders());
  }, [dispatch]);

  // Transform API data to match component expectations
  const transformedOrders = useMemo(() => {
    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: {
        name: order.customer?.name || "N/A",
        email: order.customer?.email || "N/A",
        phone: order.customer?.phone || "N/A",
      },
      items: order.items || [],
      itemsCount: order.itemsCount || order.items?.length || 0,
      totalAmount: order.totalAmount || 0,
      orderDate: order.orderDate,
      orderStatus: order.orderStatus || "pending",
      paymentStatus: order.paymentStatus || "pending",
      paymentMethod: order.paymentMethod || "N/A",
      shippingAddress: order.shippingAddress || {},
      subtotal: order.subtotal || 0,
      shippingCharge: order.shippingCharge || 0,
      taxAmount: order.taxAmount || 0,
      grandTotal: order.grandTotal || order.totalAmount || 0,
    }));
  }, [orders]);

  // Table columns configuration (same as before)
  const orderColumns = [
    {
      key: "orderNumber",
      title: "Order ID",
      render: (order) => (
        <div className="min-w-[120px]">
          <div className="font-semibold text-gray-900">{order.orderNumber}</div>
          <div className="text-xs text-gray-500">ID: {order.id}</div>
        </div>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      render: (order) => (
        <div className="min-w-[150px]">
          <div className="font-medium text-gray-900">{order.customer.name}</div>
          <div className="text-sm text-gray-500 truncate">
            {order.customer.email}
          </div>
          <div className="text-xs text-gray-400">{order.customer.phone}</div>
        </div>
      ),
    },
    {
      key: "products",
      title: "Products & Amount",
      render: (order) => (
        <div className="min-w-[140px]">
          <div className="flex items-center text-sm">
            <FaBox className="text-gray-400 mr-2 w-3 h-3" />
            <span className="font-medium">{order.itemsCount} items</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            ₹{order.totalAmount?.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      key: "orderDate",
      title: "Order Date",
      render: (order) => (
        <div className="min-w-[140px]">
          <div className="font-medium text-gray-900">
            {new Date(order.orderDate).toLocaleDateString("en-IN")}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(order.orderDate).toLocaleTimeString("en-IN")}
          </div>
        </div>
      ),
    },
    {
      key: "orderStatus",
      title: "Order Status",
      sortable: true,
      render: (order) => {
        const statusConfig = {
          pending: {
            color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
            icon: FaClock,
            label: "Pending",
          },
          confirmed: {
            color: "bg-blue-100 text-blue-800 border border-blue-200",
            icon: FaCheckCircle,
            label: "Confirmed",
          },
          processing: {
            color: "bg-purple-100 text-purple-800 border border-purple-200",
            icon: FaBox,
            label: "Processing",
          },
          shipped: {
            color: "bg-indigo-100 text-indigo-800 border border-indigo-200",
            icon: FaShippingFast,
            label: "Shipped",
          },
          delivered: {
            color: "bg-green-100 text-green-800 border border-green-200",
            icon: FaCheckCircle,
            label: "Delivered",
          },
          cancelled: {
            color: "bg-red-100 text-red-800 border border-red-200",
            icon: FaTimesCircle,
            label: "Cancelled",
          },
        };

        const config = statusConfig[order.orderStatus] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
          <div className="flex justify-center">
            <span
              className={`px-3 py-2 rounded-full text-xs font-medium capitalize flex items-center space-x-1 ${config.color}`}
            >
              <IconComponent className="w-3 h-3" />
              <span>{config.label}</span>
            </span>
          </div>
        );
      },
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (order) => {
        const paymentConfig = {
          paid: { color: "bg-green-100 text-green-800", label: "Paid" },
          pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
          failed: { color: "bg-red-100 text-red-800", label: "Failed" },
          refunded: { color: "bg-gray-100 text-gray-800", label: "Refunded" },
        };

        const config =
          paymentConfig[order.paymentStatus] || paymentConfig.pending;

        return (
          <div className="flex flex-col space-y-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-center ${config.color}`}
            >
              {config.label}
            </span>
            <span className="text-xs text-gray-500 text-center">
              {order.paymentMethod}
            </span>
          </div>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (order) => (
        <div className="flex space-x-2 justify-center">
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
            onClick={() => handleViewOrder(order.id)}
            title="View Order Details"
          >
            <FaEye className="w-4 h-4" />
          </button>
          <button
            className="text-green-500 hover:text-green-700 transition-colors p-2 rounded-full hover:bg-green-50"
            onClick={() => handleDownloadInvoice(order.id)}
            title="Download Invoice"
          >
            <FaDownload className="w-4 h-4" />
          </button>
          <button
            className="text-purple-500 hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-purple-50"
            onClick={() => handlePrintOrder(order.id)}
            title="Print Order"
          >
            <FaPrint className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Filter and sort orders (same logic as before)
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = transformedOrders;

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.customer.name.toLowerCase().includes(searchLower) ||
          order.customer.email.toLowerCase().includes(searchLower) ||
          order.id.toString().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.orderStatus !== "All") {
      filtered = filtered.filter(
        (order) => order.orderStatus === filters.orderStatus
      );
    }

    // Apply payment status filter
    if (filters.paymentStatus !== "All") {
      filtered = filtered.filter(
        (order) => order.paymentStatus === filters.paymentStatus
      );
    }

    // Apply date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (order) => new Date(order.orderDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (order) => new Date(order.orderDate) <= toDate
      );
    }

    // Apply sorting
    if (sortConfig.field) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.field];
        let bValue = b[sortConfig.field];

        if (sortConfig.field === "customer") {
          aValue = a.customer.name;
          bValue = b.customer.name;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [transformedOrders, filters, sortConfig]);

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalOrders = filteredAndSortedOrders.length;
    const pendingOrders = filteredAndSortedOrders.filter((order) =>
      ["pending", "confirmed", "processing"].includes(order.orderStatus)
    ).length;
    const totalRevenue = filteredAndSortedOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    return {
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue.toFixed(2),
    };
  }, [filteredAndSortedOrders]);

  // Event handlers
  const handleViewOrder = (orderId) => {
    navigate(`/seller/order/orderlist/${orderId}`);
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for order ${orderId}`);
    alert(`Invoice downloaded for order ${orderId}`);
  };

  const handlePrintOrder = (orderId) => {
    console.log(`Printing order ${orderId}`);
    alert(`Printing order ${orderId}`);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      orderStatus: "All",
      paymentStatus: "All",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
    setSortConfig({ field: "", direction: "asc" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Show error message if any
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FaTimesCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load Orders
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(GetSellerOrders())}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track your customer orders efficiently
          </p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {statistics.totalOrders}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Total Orders
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {statistics.pendingOrders}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Pending Orders
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              ₹{statistics.totalRevenue}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Total Revenue
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Controls Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Search and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search orders by ID, customer, email..."
                className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.searchTerm}
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="button"
              className="border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 flex items-center justify-center whitespace-nowrap transition-colors font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-3" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border rounded-lg bg-gray-50">
            {/* Order Status Filter */}
            <FormControl fullWidth size="medium">
              <InputLabel>Order Status</InputLabel>
              <Select
                value={filters.orderStatus}
                label="Order Status"
                onChange={(e) => updateFilter("orderStatus", e.target.value)}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            {/* Payment Status Filter */}
            <FormControl fullWidth size="medium">
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={filters.paymentStatus}
                label="Payment Status"
                onChange={(e) => updateFilter("paymentStatus", e.target.value)}
              >
                <MenuItem value="All">All Payments</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="refunded">Refunded</MenuItem>
              </Select>
            </FormControl>

            {/* Date From Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter("dateFrom", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date To Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter("dateTo", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                className="w-full border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls - Top */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredAndSortedOrders.length / itemsPerPage)}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={filteredAndSortedOrders.length}
        showItemsPerPage={true}
      />

      {/* Orders Table */}
      <DataTable
        columns={orderColumns}
        data={paginatedOrders}
        loading={loading}
        emptyMessage="No orders found matching your criteria. Try adjusting your filters."
        sortField={sortConfig.field}
        sortDirection={sortConfig.direction}
      />
    </div>
  );
};

export default SellerOrdersList;
