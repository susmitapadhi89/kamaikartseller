import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaPrint,
  FaDownload,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShoppingBag,
  FaCreditCard,
  FaRupeeSign,
  FaTruck,
  FaUndo,
  FaReply,
  FaHome,
  FaBuilding,
  FaStore,
  FaReceipt,
  FaCalendarAlt,
  FaSync,
  FaExclamationTriangle,
} from "react-icons/fa";

import { GetSellerOrdersByID } from "../Redux/Features/OrderServiceSlice";

export const SellerOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { PersonalOrderData, loading, updating, error } = useSelector(
    (state) => state.OrderOpration
  );

  useEffect(() => {
    console.log("Fetching order details for ID:", orderId);
    dispatch(GetSellerOrdersByID(orderId));
  }, [dispatch, orderId]);

  // Safe data access functions
  const getOrderItems = () => {
    return PersonalOrderData?.items || [];
  };

  const getItemsCount = () => {
    return PersonalOrderData?.itemsCount || getOrderItems().length;
  };

  const getShippingAddress = () => {
    return PersonalOrderData?.shippingAddress || {};
  };

  const getCustomerInfo = () => {
    return PersonalOrderData?.customer || {};
  };

  // Calculate item total
  const calculateItemTotal = (item) => {
    return (item?.price || 0) * (item?.quantity || 0);
  };

  // Calculate order totals
  const calculateOrderTotals = (orderData) => {
    if (!orderData) return {};

    const items = getOrderItems();
    const itemsTotal = items.reduce((sum, item) => {
      return sum + calculateItemTotal(item);
    }, 0);

    const shippingCharge = orderData.shippingCharge || 0;
    const taxAmount = orderData.taxAmount || 0;
    const discount = orderData.discount || 0;
    const grandTotal =
      orderData.grandTotal ||
      orderData.totalAmount ||
      itemsTotal + shippingCharge + taxAmount - discount;

    return {
      itemsTotal,
      shippingCharge,
      taxAmount,
      discount,
      grandTotal,
    };
  };

  // Status update handler
  const handleStatusUpdate = async (action) => {
    if (!PersonalOrderData) return;

    const confirmMessage =
      action === "dispatch"
        ? "Are you sure you want to dispatch this order?"
        : "Are you sure you want to mark this return as received?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    const newStatus = action === "dispatch" ? "shipped" : "return_completed";
    // Implementation for status update
  };

  // Download invoice
  const handleDownloadInvoice = () => {
    if (!PersonalOrderData) return;
    const invoiceData = {
      orderNumber: PersonalOrderData.orderNumber,
      customer: getCustomerInfo(),
      items: getOrderItems(),
      totals: calculateOrderTotals(PersonalOrderData),
    };
    console.log("Downloading invoice:", invoiceData);
    alert(`Invoice downloaded for order ${PersonalOrderData.orderNumber}`);
  };

  // Print order
  const handlePrintOrder = () => {
    window.print();
  };

  // Get address tag icon
  const getAddressTagIcon = (tag) => {
    switch (tag) {
      case "HOME":
        return <FaHome className="w-4 h-4" />;
      case "WORK":
        return <FaBuilding className="w-4 h-4" />;
      default:
        return <FaMapMarkerAlt className="w-4 h-4" />;
    }
  };

  // Status configuration with enhanced styling
  const statusConfig = {
    pending: {
      color: "bg-yellow-50 text-yellow-800 border-yellow-200",
      icon: FaClock,
      label: "Pending",
      description: "Order is waiting for dispatch confirmation",
      progress: 25,
    },
    confirmed: {
      color: "bg-blue-50 text-blue-800 border-blue-200",
      icon: FaCheckCircle,
      label: "Confirmed",
      description: "Order has been confirmed and is being processed",
      progress: 50,
    },
    processing: {
      color: "bg-purple-50 text-purple-800 border-purple-200",
      icon: FaSync,
      label: "Processing",
      description: "Order is being prepared for shipment",
      progress: 75,
    },
    shipped: {
      color: "bg-indigo-50 text-indigo-800 border-indigo-200",
      icon: FaShippingFast,
      label: "Dispatched",
      description: "Order has been dispatched and is on its way to customer",
      progress: 90,
    },
    delivered: {
      color: "bg-green-50 text-green-800 border-green-200",
      icon: FaCheckCircle,
      label: "Delivered",
      description: "Order has been successfully delivered to customer",
      progress: 100,
    },
    return_requested: {
      color: "bg-orange-50 text-orange-800 border-orange-200",
      icon: FaReply,
      label: "Return Requested",
      description: "Customer has requested return for this order",
      progress: 25,
    },
    return_completed: {
      color: "bg-red-50 text-red-800 border-red-200",
      icon: FaUndo,
      label: "Return Completed",
      description: "Return process has been completed successfully",
      progress: 100,
    },
    cancelled: {
      color: "bg-gray-100 text-gray-800 border-gray-300",
      icon: FaTimesCircle,
      label: "Cancelled",
      description: "Order has been cancelled",
      progress: 0,
    },
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700">
            Loading Order Details
          </h3>
          <p className="text-gray-500">Fetching your order information...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Order
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => dispatch(GetSellerOrdersByID(orderId))}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/seller/orders")}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!PersonalOrderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/seller/orders")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const currentStatus =
    statusConfig[PersonalOrderData.orderStatus] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;
  const totals = calculateOrderTotals(PersonalOrderData);
  const orderItems = getOrderItems();
  const itemsCount = getItemsCount();
  const shippingAddress = getShippingAddress();
  const customerInfo = getCustomerInfo();

  // Check if actions are allowed
  const canDispatch = ["pending", "confirmed", "processing"].includes(
    PersonalOrderData.orderStatus
  );
  const canMarkReturnReceived =
    PersonalOrderData.orderStatus === "return_requested";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaStore className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Order #{PersonalOrderData.orderNumber}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <span>
                        {new Date(
                          PersonalOrderData.orderDate
                        ).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-3">
                {canDispatch && (
                  <button
                    onClick={() => handleStatusUpdate("dispatch")}
                    disabled={updating}
                    className="flex items-center space-x-3 px-6 py-3 bg-blue-300  text-black rounded-xl hover:from-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform "
                  >
                    <FaTruck className="w-5 h-5" />
                    <span>
                      {updating ? "Dispatching..." : "Dispatch Order"}
                    </span>
                  </button>
                )}

                {canMarkReturnReceived && (
                  <button
                    onClick={() => handleStatusUpdate("return_received")}
                    disabled={updating}
                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                  >
                    <FaUndo className="w-5 h-5" />
                    <span>
                      {updating ? "Processing..." : "Return Received"}
                    </span>
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadInvoice}
                  className="flex items-center space-x-2 px-4 py-3 border-2 border-blue-200 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <FaDownload className="w-4 h-4" />
                  <span>Invoice</span>
                </button>

                <button
                  onClick={handlePrintOrder}
                  className="flex items-center space-x-2 px-4 py-3 border-2 border-gray-200 bg-white text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <FaPrint className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Enhanced Status Card */}

            {/* Enhanced Order Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaShoppingBag className="w-6 h-6 mr-3 text-blue-600" />
                  Order Items ({itemsCount})
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                            {item.productImage ? (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full rounded-xl flex items-center justify-center hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              <FaBox className="w-8 h-8 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.productName || "Product Name Not Available"}
                          </h3>

                          {item.variant && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-700">
                                Variant:
                              </span>
                              <span className="text-sm text-gray-600 ml-2 bg-gray-100 px-3 py-1 rounded-lg border">
                                {item.variant}
                              </span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-4">
                            <div className="bg-blue-50 px-3 py-2 rounded-lg">
                              <span className="text-sm font-medium text-blue-700">
                                Quantity:
                              </span>
                              <span className="text-sm text-blue-600 ml-2 font-semibold">
                                {item.quantity || 0}
                              </span>
                            </div>

                            <div className="bg-green-50 px-3 py-2 rounded-lg">
                              <span className="text-sm font-medium text-green-700">
                                Unit Price:
                              </span>
                              <span className="text-sm text-green-600 ml-2 flex items-center font-semibold">
                                <FaRupeeSign className="w-3 h-3 mr-1" />
                                {(item.price || 0)?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 flex items-center justify-end">
                            <FaRupeeSign className="w-5 h-5 mr-1" />
                            {calculateItemTotal(item)?.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Item Total
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FaBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      No items found in this order.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaMapMarkerAlt className="w-6 h-6 mr-3 text-blue-600" />
                  Shipping Address
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FaUser className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {shippingAddress.name || "Name Not Available"}
                      </h3>
                      {shippingAddress.address_tag && (
                        <div className="flex items-center space-x-2 mt-1">
                          {getAddressTagIcon(shippingAddress.address_tag)}
                          <span className="text-sm text-gray-600 capitalize">
                            {shippingAddress.address_tag.toLowerCase()} Address
                          </span>
                          {shippingAddress.default_address && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl border">
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Contact Information
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <FaPhone className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">
                            {shippingAddress.phone_number || "Not available"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border">
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Location Details
                      </label>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Flat/Building:
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {shippingAddress.flat || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Area/Locality:
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {shippingAddress.area || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <label className="text-sm font-medium text-blue-700 block mb-2">
                        Complete Address
                      </label>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          {shippingAddress.address1 ||
                            "Address line 1 not specified"}
                        </p>
                        {shippingAddress.address2 && (
                          <p>{shippingAddress.address2}</p>
                        )}
                        <p className="font-medium mt-2">
                          {shippingAddress.city || "City"} -{" "}
                          {shippingAddress.postal_code || "PIN"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-green-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaReceipt className="w-6 h-6 mr-3 text-green-600" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">
                    Items Total ({itemsCount} items)
                  </span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <FaRupeeSign className="w-4 h-4 mr-1" />
                    {totals.itemsTotal?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Shipping Charge</span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <FaRupeeSign className="w-4 h-4 mr-1" />
                    {totals.shippingCharge?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Tax Amount</span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <FaRupeeSign className="w-4 h-4 mr-1" />
                    {totals.taxAmount?.toLocaleString()}
                  </span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600 flex items-center">
                      -<FaRupeeSign className="w-4 h-4 mr-1" />
                      {totals.discount?.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl px-4 -mx-2">
                  <span className="text-lg font-bold text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-green-600 flex items-center">
                    <FaRupeeSign className="w-5 h-5 mr-1" />
                    {totals.grandTotal?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaUser className="w-6 h-6 mr-3 text-purple-600" />
                  Customer Information
                </h2>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-inner">
                    <FaUser className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {customerInfo.name || "Customer Name Not Available"}
                    </p>
                    <p className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-full inline-block mt-1">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl border">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaEnvelope className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-600 truncate">
                        {customerInfo.email || "Email not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl border">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FaPhone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">
                        {customerInfo.phone || "Phone not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Payment Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-orange-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaCreditCard className="w-6 h-6 mr-3 text-orange-600" />
                  Payment Information
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-900">
                    {PersonalOrderData.paymentMethod || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Payment Status</span>
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      PersonalOrderData.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : PersonalOrderData.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {(PersonalOrderData.paymentStatus || "unknown")
                      ?.charAt(0)
                      .toUpperCase() +
                      (PersonalOrderData.paymentStatus || "unknown")?.slice(1)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-bold text-gray-900 flex items-center text-lg">
                    <FaRupeeSign className="w-5 h-5 mr-1" />
                    {(PersonalOrderData.totalAmount || 0)?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetails;
