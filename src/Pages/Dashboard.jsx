export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Selling Products Section */}
      <section className="bg-background rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Selling Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Media
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  $ time 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Europos 1
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Phone ID Pro Max
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3600
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  380
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $134.81
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3200
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $180.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $140.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Profit Delivery Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Profit Delivery
        </h2>
        <div className="flex flex-wrap gap-4">
          {["3500", "380", "$133.83", "3300", "$180.00"].map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-50 rounded-md text-sm font-medium text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Sales Reports Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Corporate Sales Reports
        </h2>
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Recent Activity
          </h3>
          <ul className="space-y-2">
            {[
              "New Order #2025",
              "Long phone - delivery",
              "Low Product",
              "Checking - first use",
              "New Version",
              "Direct Indices - first use",
              "Support: Total Contract",
              "Report: Start Control",
              "Buyer: Checked - first use",
              "Select:",
              "Select Presented",
              "Order #2025 - first use",
            ].map((item, index) => (
              <li
                key={index}
                className="pb-2 border-b border-gray-100 last:border-0 text-sm text-gray-600"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
