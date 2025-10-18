// OrderRow.jsx
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModel";

const OrderRow = ({ order, isSelected, onSelect, onStatusUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "yellow", label: "Pending" },
      confirmed: { color: "indigo", label: "Confirmed" },
      shipped: { color: "blue", label: "Shipped" },
      delivered: { color: "green", label: "Delivered" },
      cancelled: { color: "red", label: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}
      >
        {config.label}
      </span>
    );
  };

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(order.id, newStatus);
    setShowDropdown(false);
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const mainProduct = order.items[0]?.product;

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={isSelected}
            onChange={(e) => onSelect(order.id, e.target.checked)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-blue-600">#{order.id}</div>
            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("en-IN")}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {order.user.name}
            </div>
            <div className="text-sm text-gray-500">{order.user.email}</div>
            <div className="text-sm text-gray-500">{order.user.phoneno}</div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {mainProduct?.name}
            </div>
            {order.items.length > 1 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 ml-1">
                +{order.items.length - 1} more
              </span>
            )}
            <div className="text-sm text-gray-500 mt-1">
              {totalItems} item{totalItems > 1 ? "s" : ""} •{" "}
              {mainProduct?.brand}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {order.address.name}
            </div>
            <div className="text-sm text-gray-500">
              {order.address.flat}, {order.address.area}
            </div>
            <div className="text-sm text-gray-500">
              {order.address.address1}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-green-600">
              ₹{order.total_amount}
            </div>
            <div className="text-sm text-gray-500">
              {order.payment_method.name}
            </div>
            {order.promo_code && (
              <div className="text-sm text-blue-600 flex items-center mt-1">
                <i className="fas fa-tag mr-1 text-xs"></i>
                {order.promo_code}
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getStatusBadge(order.status)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="relative">
            <button
              className="inline-flex items-center p-2 border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowDetails(true);
                      setShowDropdown(false);
                    }}
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Details
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  {order.status === "pending" && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 flex items-center"
                      onClick={() => handleStatusChange("confirmed")}
                    >
                      <i className="fas fa-check mr-2"></i>
                      Confirm Order
                    </button>
                  )}

                  {(order.status === "pending" ||
                    order.status === "confirmed") && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 flex items-center"
                      onClick={() => handleStatusChange("shipped")}
                    >
                      <i className="fas fa-shipping-fast mr-2"></i>
                      Mark Shipped
                    </button>
                  )}

                  {order.status === "shipped" && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 flex items-center"
                      onClick={() => handleStatusChange("delivered")}
                    >
                      <i className="fas fa-box mr-2"></i>
                      Mark Delivered
                    </button>
                  )}

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    onClick={() => handleStatusChange("cancelled")}
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>

      <OrderDetailsModal
        order={order}
        show={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default OrderRow;
