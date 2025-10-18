const OrderStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Orders",
      value: stats.total,
      icon: "fas fa-shopping-cart",
      color: "blue",
      change: "+12%",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "fas fa-clock",
      color: "yellow",
      change: "+5%",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: "fas fa-check-circle",
      color: "indigo",
      change: "+8%",
    },
    {
      title: "Shipped",
      value: stats.shipped,
      icon: "fas fa-shipping-fast",
      color: "blue",
      change: "+15%",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: "fas fa-box",
      color: "green",
      change: "+20%",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: "fas fa-rupee-sign",
      color: "green",
      change: "+18%",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      icon: "text-yellow-500",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      icon: "text-indigo-500",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "text-green-500",
    },
    red: { bg: "bg-red-50", text: "text-red-600", icon: "text-red-500" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const colors = colorClasses[stat.color];
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  {stat.change}
                </p>
              </div>
              <div className={`${colors.bg} rounded-full p-3`}>
                <i className={`${stat.icon} ${colors.icon} text-lg`}></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;
