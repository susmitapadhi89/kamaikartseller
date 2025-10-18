const VariantsList = ({
  variants,
  updateVariant,
  handleVariantImageUpload,
  removeVariantImage,
  errors,
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Generated Variants</h3>

      {variants.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
          No variants generated. Please add variation options above.
        </div>
      )}

      <div className="space-y-6">
        {variants.map((v, i) => (
          <div
            key={i}
            className="p-4 border rounded-md bg-white shadow-sm relative"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-800">
                Variant:{" "}
                <span className="text-blue-600">
                  {Array.isArray(v.attributes)
                    ? v.attributes
                        .map((c) =>
                          typeof c === "object"
                            ? c?.attribute_value?.value || c.value
                            : c.value
                        )
                        .join(" / ")
                    : "No attributes"}
                </span>
              </h4>
              <button
                type="button"
                onClick={() => {
                  const updated = variants.filter((_, idx) => idx !== i);
                  updateVariant(null, "setAll", updated);
                }}
                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
              >
                Remove Variant
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  value={v.price || ""}
                  onChange={(e) => updateVariant(i, "price", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price ($)*
                </label>
                <input
                  type="number"
                  value={v.selling_price || ""}
                  onChange={(e) =>
                    updateVariant(i, "selling_price", e.target.value)
                  }
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`variant-price-${i}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                  required
                />
                {errors[`variant-price-${i}`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[`variant-price-${i}`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  value={v.stock || ""}
                  onChange={(e) => updateVariant(i, "stock", e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[`variant-stock-${i}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0"
                  required
                />
                {errors[`variant-stock-${i}`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[`variant-stock-${i}`]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variant Images
              </label>

              {v.images && v.images.length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-3">
                  {v.images.map((image, imgIndex) => (
                    <div key={image.id || imgIndex} className="relative group">
                      <img
                        src={
                          image?.url && typeof image.url === "string"
                            ? image.url // DB image
                            : image instanceof File
                            ? URL.createObjectURL(image) // Newly uploaded file
                            : "" // fallback
                        }
                        alt={`Variant ${i + 1} image ${imgIndex + 1}`}
                        className="h-20 w-20 object-cover rounded-md border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeVariantImage(i, imgIndex, image.id)
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600 text-xs"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-3">No images added</p>
              )}

              <div className="border border-dashed border-gray-300 rounded-md p-3 hover:border-blue-300 transition-colors">
                <input
                  type="file"
                  id={`variant-images-${i}`}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    handleVariantImageUpload(i, Array.from(e.target.files))
                  }
                />
                <label
                  htmlFor={`variant-images-${i}`}
                  className="cursor-pointer flex items-center justify-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add variant images
                </label>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Maximum 5 images per variant
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsList;
