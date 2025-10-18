const ProductHeader = ({ navigate, mode }) => {
  const isEdit = mode === "edit";

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {" "}
          {isEdit ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {isEdit
            ? "Update your product details"
            : "Add a new product to your inventory"}{" "}
        </p>
      </div>
      <button
        onClick={() => navigate("/seller/ListProduct")}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Products
      </button>
    </div>
  );
};

export default ProductHeader;
