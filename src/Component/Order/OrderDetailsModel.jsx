const OrderDetailsModal = ({ order, show, onClose }) => {
  if (!order || !show) return null;

  const getVariantInfo = (item) => {
    if (!item.variant_id) return "Default";

    const variant = item.product.variants.find(
      (v) => v.id === item.variant_id.toString()
    );
    if (!variant || !variant.attributes || variant.attributes.length === 0)
      return "Default";

    return variant.attributes
      .map((attr) => `${attr.attribute.name}: ${attr.attribute_value.value}`)
      .join(", ");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <i className="fas fa-receipt mr-2"></i>
            Order Details - #{order.id}
          </h2>
          <button
            className="text-white hover:text-gray-200 text-xl"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Customer Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span> {order.user.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {order.user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.user.phoneno}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Order Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {order.payment_method.name}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Status:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-indigo-100 text-indigo-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Shipping Address
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{order.address.name}</p>
                <p>
                  {order.address.flat}, {order.address.area}
                </p>
                <p>
                  {order.address.address1}, {order.address.address2}
                </p>
                <p>Postal: {order.address.postal_code}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Order Items</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Brand
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Variant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded p-2 mr-3">
                            <i className="fas fa-box text-gray-400"></i>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {item.product.variants[0]?.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.product.brand}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {getVariantInfo(item)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Total */}
          <div className="flex justify-end">
            <div className="bg-gray-50 rounded-lg p-6 w-full md:w-96">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">₹{order.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₹{order.tax}</span>
                </div>
                {order.promo_code && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({order.promo_code}):</span>
                    <span>
                      -₹
                      {(
                        order.subtotal +
                        order.shipping +
                        order.tax -
                        order.total_amount
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">
                      ₹{order.total_amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <i className="fas fa-times mr-2"></i>
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-print mr-2"></i>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
