export const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found",
}) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key] || "-";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full product-table">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left py-3 px-4 font-semibold text-gray-700 border-r ${
                      column.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      {column.title}
                      {column.sortable && <span className="ml-1"></span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className=" text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-t hover:bg-gray-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="py-3 px-4 border-r border-gray-200"
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
