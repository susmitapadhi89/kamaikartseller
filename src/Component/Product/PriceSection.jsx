const PricingSection = ({ product, handleChange, errors }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Pricing & Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original Price *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className={`w-full pl-8 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder="00"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selling Price *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="selling_price"
              value={product.selling_price}
              onChange={handleChange}
              className={`w-full pl-8 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.selling_price ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder="00"
            />
          </div>
          {errors.selling_price && (
            <p className="mt-1 text-sm text-red-600">{errors.selling_price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock *
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
            required
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Cost
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="shipping_cost"
              value={product.shipping_cost}
              onChange={handleChange}
              className="w-full pl-8 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder=" 00"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
