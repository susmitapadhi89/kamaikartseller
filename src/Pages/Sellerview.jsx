import React, { useState } from "react";
import {
  FaUserCircle,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes,
  FaPlusCircle,
  FaDownload,
  FaFileExport,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

// Sample seller data
const sellers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    role: "Seller",
    shop: "Fashion Store",
    gst: "12ABCDE1234F1Z5",
    status: "Pending",
    shopImage:
      "https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    aadhar:
      "https://images.unsplash.com/photo-1586074299757-dc655f18518c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    pan: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    gstCertificate:
      "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    canceledCheck:
      "https://images.unsplash.com/photo-1604594849809-dfed84882784?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "8765432109",
    role: "Seller",
    shop: "Electronics Hub",
    gst: "09XYZDE1234F1Z5",
    status: "Approved",
    shopImage:
      "https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    aadhar:
      "https://images.unsplash.com/photo-1586074299757-dc655f18518c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    pan: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    gstCertificate:
      "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    canceledCheck:
      "https://images.unsplash.com/photo-1604594849809-dfed84882784?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

export const SellerView = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [imageModal, setImageModal] = useState({
    visible: false,
    src: "",
    title: "",
  });

  //model open close
  const openSellerModal = (seller) => {
    setSelectedSeller(seller);
  };

  const closeSellerModal = () => {
    setSelectedSeller(null);
  };

  const openImageModal = (src, title) => {
    setImageModal({ visible: true, src, title });
  };

  const closeImageModal = () => {
    setImageModal({ visible: false, src: "", title: "" });
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-500">
          Seller Management System
        </h1>
        <div className="flex items-center space-x-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            Admin
          </span>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <FaUserCircle className="mr-2" /> Admin Panel
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seller List */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Seller List
            </h2>
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sellers..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <FaFilter className="mr-2" /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
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
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={seller.shopImage}
                        alt={seller.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {seller.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {seller.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{seller.shop}</div>
                      <div className="text-sm text-gray-500">
                        GST: {seller.gst}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {seller.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${statusColor(
                          seller.status
                        )}`}
                      >
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-3 flex items-center"
                        onClick={() => openSellerModal(seller)}
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats and Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Registration Stats
            </h2>
            <div className="space-y-4">
              {["Pending", "Approved", "Rejected"].map((status) => (
                <div key={status}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {status}
                    </span>
                    <span className="text-sm font-medium text-gray-700">1</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${statusColor(status)} h-2 rounded-full`}
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
            <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Add New Seller</span> <FaPlusCircle />
            </button>
            <button className="w-full bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Generate Report</span> <FaDownload />
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Export Data</span> <FaFileExport />
            </button>
          </div>
        </div>
      </div>

      {/* Seller Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeSellerModal}
          ></div>
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 max-h-screen overflow-y-auto z-50 relative p-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Seller Details
              </h2>
              <button
                onClick={closeSellerModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Personal Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Business Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Shop Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.shop}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GST Number
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedSeller.gst}
                    </p>
                  </div>
                  {/* Add more fields as needed */}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Documents
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Shop Image", src: selectedSeller.shopImage },
                    { label: "Aadhar Card", src: selectedSeller.aadhar },
                    { label: "PAN Card", src: selectedSeller.pan },
                    {
                      label: "GST Certificate",
                      src: selectedSeller.gstCertificate,
                    },
                    {
                      label: "Canceled Check",
                      src: selectedSeller.canceledCheck,
                    },
                  ].map((doc, idx) => (
                    <div key={idx} className="text-center">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label}
                      </label>
                      <div
                        className="cursor-pointer transform transition duration-300 hover:scale-105"
                        onClick={() => openImageModal(doc.src, doc.label)}
                      >
                        <img
                          src={doc.src}
                          alt={doc.label}
                          className="rounded-lg h-32 w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4 border-t pt-4">
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center">
                <FaTimesCircle className="mr-2" /> Reject
              </button>
              <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg flex items-center">
                <FaCheckCircle className="mr-2" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModal.visible && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-90"
            onClick={closeImageModal}
          ></div>
          <div className="z-50 relative max-w-4xl w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl">{imageModal.title}</h3>
              <button
                onClick={closeImageModal}
                className="text-white hover:text-gray-300"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <img
              src={imageModal.src}
              alt={imageModal.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
