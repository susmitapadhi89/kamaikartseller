import OrderRow from "./OrderRow";

const OrderTable = ({
  orders,
  selectedOrders,
  onSelectionChange,
  onStatusUpdate,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(orders.map((order) => order.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOrder = (orderId, isSelected) => {
    if (isSelected) {
      onSelectionChange([...selectedOrders, orderId]);
    } else {
      onSelectionChange(selectedOrders.filter((id) => id !== orderId));
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders found
        </h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Products
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shipping Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isSelected={selectedOrders.includes(order.id)}
              onSelect={handleSelectOrder}
              onStatusUpdate={onStatusUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
