const MediaSection = ({ product, handleImageUpload, removeImage }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Media
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gallery Images*
          </label>

          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              {product.images.map((image, index) => {
                // Handle different image formats
                let imageUrl = "";

                if (typeof image === "string") {
                  // Case 1: Simple string URL
                  imageUrl = image;
                } else if (image instanceof File || image instanceof Blob) {
                  // Case 2: File/Blob object (new uploads)
                  imageUrl = URL.createObjectURL(image);
                } else if (
                  image &&
                  typeof image === "object" &&
                  image.image_url
                ) {
                  // Case 3: Object with image_url property (edit mode)
                  imageUrl = image.image_url;
                } else {
                  // Invalid image - skip rendering
                  console.warn("Invalid image format at index:", index, image);
                  return null;
                }
                return (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-32 object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                      {`Image ${index + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-blue-500 bg-blue-50 border-gray-300  border-dashed rounded-lg p-8 text-center transition-colors">
            <input
              type="file"
              id="product-images"
              name="images"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="product-images"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <svg
                className="w-12 h-12 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-blue-600">
                  Click to upload
                </span>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG (Max 10 images)
              </p>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
