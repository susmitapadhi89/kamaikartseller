// export const ListProduct = ({ columns, data, onEdit, onDelete, onView }) => {
//   return (
//     <table className="min-w-full divide-y divide-gray-200">
//       {/* Table Head */}
//       <thead className="bg-primary">
//         <tr>
//           {columns.map((col) => (
//             <th
//               key={col.key}
//               scope="col"
//               className="px-6 py-3 text-left text-xxs  text-fontcolourwhite uppercase tracking-wider"
//             >
//               {col.label}
//             </th>
//           ))}
//           {(onEdit || onDelete || onView) && (
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xxs text-fontcolourwhite uppercase tracking-wider"
//             >
//               Actions
//             </th>
//           )}
//         </tr>
//       </thead>

import React from "react";

//       {/* Table Body */}
//       <tbody className="bg-white divide-y divide-gray-200">
//         {data.length > 0 ? (
//           data.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-gray-50 text-xs transition-colors duration-150"
//             >
//               {columns.map((col) => (
//                 <td key={col.key} className="px-6 py-4 whitespace-nowrap">
//                   {col.key === "image" ? (
//                     <img
//                       src={row[col.key]}
//                       alt="item"
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                   ) : (
//                     row[col.key]
//                   )}
//                 </td>
//               ))}

//               {(onEdit || onDelete || onView) && (
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-3">
//                     {onView && (
//                       <button
//                         onClick={() => onView(row)}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         View
//                       </button>
//                     )}
//                     {onEdit && (
//                       <button
//                         onClick={() => onEdit(row)}
//                         className="text-green-600 hover:text-green-900"
//                       >
//                         Edit
//                       </button>
//                     )}
//                     {onDelete && (
//                       <button
//                         onClick={() => onDelete(row)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               )}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td
//               colSpan={columns.length + 1}
//               className="px-6 py-4 text-center text-sm text-gray-500"
//             >
//               No records found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };
export const ListProduct = React.memo(
  ({ columns = [], data = [], onEdit, onDelete, onView }) => {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Head */}
        <thead className="bg-primary">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-left text-xxs text-fontcolourwhite uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xxs text-fontcolourwhite uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 text-xs transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {col.key === "image" ? (
                      <img
                        src={row[col.key]}
                        alt="item"
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : col.key === "parent" ? (
                      // ✅ Parent handle
                      row.parent ? (
                        row.parent.name
                      ) : (
                        row.parent_name
                      )
                    ) : (
                      row[col.key] ?? "-"
                    )}
                  </td>
                ))}

                {(onEdit || onDelete || onView) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      {onView && (
                        <button
                          onClick={() => onView(row.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
);
