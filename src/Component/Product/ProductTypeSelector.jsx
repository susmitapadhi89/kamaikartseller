const ProductTypeSelector = ({
  product,
  setProduct,
  setOptions,
  setVariants,
}) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Type
      </label>
      <div className="flex space-x-6">
        <div
          className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
            product.type === "simple"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => {
            setProduct({ ...product, type: "simple" });
            setVariants([]);
            setOptions([]);
          }}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              product.type === "simple"
                ? "border-blue-500 bg-blue-500"
                : "border-gray-400"
            }`}
          >
            {product.type === "simple" && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">Simple Product</p>
            <p className="text-sm text-gray-600">
              Single product without variations
            </p>
          </div>
        </div>

        <div
          className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${
            product.type === "variant"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() =>
            setProduct({
              ...product,
              type: "variant",
              selling_price: "",
              price: "",
              stock: "",
              shipping_cost: "",
              images: [],
            })
          }
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              product.type === "variant"
                ? "border-blue-500 bg-blue-500"
                : "border-gray-400"
            }`}
          >
            {product.type === "variant" && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">Variant Product</p>
            <p className="text-sm text-gray-600">
              Product with variations (size, color, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeSelector;
