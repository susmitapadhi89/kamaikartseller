import { useState, useEffect, useCallback } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  FaEdit,
  FaTrash,
  // FaEye,
  FaSearch,
  FaFilter,
  FaChevronUp,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";
import {
  DeleteProductbyID,
  GetAllProductdata,
} from "../../Redux/Features/ProductServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paginations } from "../../Component/Pagination/Pagination22";
import { GetAllBrandData } from "../../Redux/Features/BrandSerivicesSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  clearSubAndSubSub,
  GetMainCategoryData,
  GetSubCategoryBYID,
  GetSubSubCategoryBYID,
} from "../../Redux/Features/CategoryServicesSlice";
import { Loader } from "../../Component/Common/Loader";
export const ListProducts = () => {
  const dispatch = useDispatch();
  const {
    MainCategorydata,
    SubCategorydata,
    SubSubCategorydata,
    // loading,
    // error,
  } = useSelector((state) => state.CategoryOpration);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    brand: "",
    maincategory: "",
    subcategory: "",
    childcategory: "",
    productType: "All",
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.searchTerm);

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(5);
  const { Products, loading, producterror, Pagination } = useSelector(
    (state) => state.ProductOpration
  );
  const { BrandValue, Brandloading, Branderror } = useSelector(
    (state) => state.BrandOpration
  );
  // Initialize products with pagination parameters
  useEffect(() => {
    const params = {
      search: debouncedSearch || "",
      page: currentPage,
      limit: itemsPerPage,
      brand: filters.brand !== "All" ? filters.brand : "",
      category_id: filters.maincategory || "",
      subcategory_id: filters.subcategory || "",
      childcategory_id: filters.childcategory || "",
      type: filters.productType !== "All" ? filters.productType : "",
    };

    dispatch(GetAllProductdata(params));
  }, [dispatch, currentPage, debouncedSearch, filters, itemsPerPage]);

  useEffect(() => {
    dispatch(GetMainCategoryData());
    dispatch(GetAllBrandData());
  }, [dispatch]);

  const Handlesubcategoryfetch = useCallback(
    (mainId) => {
      dispatch(GetSubCategoryBYID(mainId));
      dispatch(clearSubAndSubSub());
    },

    [dispatch] // stable dependency
  );

  const Handlesubsubcategoryfetch = useCallback(
    (subcategoryID) => {
      dispatch(GetSubSubCategoryBYID(subcategoryID));
    },
    [dispatch] // stable dependency
  );

  // Update local state when Redux state changes
  useEffect(() => {
    if (Products?.length > 0) {
      const transformed = transformProducts(Products);
      setProducts(transformed);

      // Set pagination info from API response
      if (Pagination) {
        setTotalPages(Pagination.totalPages);
        // setTotalItems(Pagination.totalItems);
      }
    } else {
      setProducts([]);
    }
  }, [Products, Pagination]);

  const transformProducts = (data) => {
    return data.map((p) => {
      if (p.product_type === "simple") {
        const v = p.variants[0];
        return {
          id: p.id,
          name: p.name,
          unit: p.unit || "-",
          purchasePrice: v?.price || "-",
          sellingPrice: v?.selling_price || "-",
          currentStock: v?.stock || 0,
          productType: "Single",
          category: p.childCategory_name
            ? p.childCategory_name
            : p.subCategory_name || "-",

          maincategory: p.mainCategory_name,
          subcategory: p.subCategory_name,
          brand: p.brand || "-",
          sku: v?.sku || "-",
          image: p.images?.[0]?.image_url || "/placeholder.png",
        };
      } else {
        return {
          id: p.id,
          name: p.name,
          unit: p.unit || "-",
          purchasePrice: `${Math.min(
            ...p.variants.map((v) => v.price)
          )} - ${Math.max(...p.variants.map((v) => v.price))}`,
          sellingPrice: `${Math.min(
            ...p.variants.map((v) => v.selling_price)
          )} - ${Math.max(...p.variants.map((v) => v.selling_price))}`,
          currentStock: p.variants.reduce((sum, v) => sum + v.stock, 0),
          productType: "Variable",
          category: p.childCategory_name
            ? p.childCategory_name
            : p.subCategory_name || "-",
          maincategory: p.mainCategory_name,
          subcategory: p.subCategory_name,
          brand: p.brand || "-",
          sku: p.variants.map((v) => v.sku).join(", "),
          image: p.images?.[0]?.image_url || "/placeholder.png",
        };
      }
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.searchTerm);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [filters.searchTerm]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      brand: "",
      maincategory: "",
      subcategory: "",
      childcategory: "",
      productType: "All",
    });
    setCurrentPage(1);
  };

  const handleDelete = useCallback(
    async (id) => {
      try {
        if (!id) return;

        const res = await dispatch(DeleteProductbyID(id)).unwrap();

        toast.success(res.message || "Successfully Product deleted");
        dispatch(GetAllProductdata({ page: currentPage, limit: itemsPerPage }));
      } catch (error) {
        toast.error(error.message || "Delete failed");
      }
    },
    [dispatch, currentPage, itemsPerPage]
  );

  const handleEdit = (productid) => {
    navigate(`/seller/product/edit/${productid}`);
  };
  if (producterror) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load products.
      </div>
    );
  }

  //helpr fun   for   filter
  const updateFilter = (key, value) => {
    setFilters((prev) => {
      let newValue = value === "All" ? "" : value;
      let newFilters = { ...prev, [key]: newValue };

      if (key === "maincategory") {
        // Clear sub and child categories when main changes
        newFilters.subcategory = "";
        newFilters.childcategory = "";
      }

      if (key === "subcategory") {
        // Clear child category when sub changes
        newFilters.childcategory = "";
      }

      return newFilters;
    });
  };

  return (
    <div className="container mx-auto px-2 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products List</h1>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Search and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            {/* <div className="relative flex-grow"> */}
            <div className="relative w-full md:w-[400px]">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border rounded-md w-full"
                value={filters.searchTerm}
                // onChange={(e) =>
                //   setFilters((prev) => ({
                //     ...prev,
                //     searchTerm: e.target.value,
                //   }))
                // }
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="button"
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-center whitespace-nowrap"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" /> Filter
              {showFilters ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
          </div>

          {/* Right side: Add Product button */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              className="bg-primary hover:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center whitespace-nowrap w-full md:w-auto"
              onClick={() => navigate("/seller/AddProduct")}
            >
              <FaPlus className="mr-2" /> Add Product
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 border rounded-md bg-gray-50">
            {/* Product Type Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Product Type</InputLabel>
              <Select
                value={filters.productType}
                label="Product Type"
                onChange={(e) => updateFilter("productType", e.target.value)}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All
                </MenuItem>
                <MenuItem value="simple">Single</MenuItem>
                <MenuItem value="variable">Variable</MenuItem>
              </Select>
            </FormControl>
            {/* Brand Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Brand</InputLabel>
              <Select
                value={filters.brand || "All"}
                label="Brand"
                onChange={(e) => updateFilter("brand", e.target.value)}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All
                </MenuItem>
                {Array.isArray(BrandValue) && BrandValue.length > 0 ? (
                  BrandValue.map((brand) => (
                    <MenuItem
                      key={brand?.id}
                      value={brand?.name}
                      disabled={!brand?.id}
                    >
                      {brand?.name || "Unnamed Brand"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Brands Available</MenuItem>
                )}
              </Select>
            </FormControl>
            {/* Category Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Main Category</InputLabel>
              <Select
                value={filters.maincategory || "All"}
                label="MainCategory"
                onChange={(e) => {
                  updateFilter("maincategory", e.target.value);
                  Handlesubcategoryfetch(e.target.value);
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                      overflowY: "auto",
                    },
                  },
                }}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All
                </MenuItem>
                {Array.isArray(MainCategorydata) &&
                MainCategorydata.length > 0 ? (
                  MainCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Brand"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Main Category Available</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              size="small"
              disabled={!filters.maincategory || filters.maincategory === "All"}
            >
              <InputLabel>Sub Category</InputLabel>
              <Select
                value={filters.subcategory || "All"}
                label="SubCategory"
                onChange={(e) => {
                  updateFilter("subcategory", e.target.value);
                  Handlesubsubcategoryfetch(e.target.value);
                }}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All
                </MenuItem>
                {Array.isArray(SubCategorydata) &&
                SubCategorydata.length > 0 ? (
                  SubCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Brand"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Sub Category Available</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              size="small"
              disabled={!filters.subcategory || filters.subcategory === "All"}
            >
              <InputLabel>Child Category</InputLabel>
              <Select
                value={filters.childcategory || "All"}
                label="ChildCategory"
                onChange={(e) => updateFilter("childcategory", e.target.value)}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All
                </MenuItem>
                {Array.isArray(SubSubCategorydata) &&
                SubSubCategorydata.length > 0 ? (
                  SubSubCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Brand"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Child Category Available</MenuItem>
                )}
              </Select>
            </FormControl>
            {/* Reset Button */}
            <div className="flex items-end">
              <button
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm text-gray-700 mr-2">Show</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-700 ml-2">Entries</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <div>
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />{" "}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full product-table">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer border-r ">
                    Image
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer border-r">
                    Product
                  </th>

                  <th className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer border-r">
                    Purchase Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer border-r">
                    Selling Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer border-r">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r">
                    Product Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r">
                    Brand
                  </th>

                  <th className="action-cell py-3 px-4 font-semibold text-gray-700 border-r ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-black-400">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-6 text-center">
                      <i className="fas fa-spinner fa-spin text-xl text-primary"></i>
                      <Loader />
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="py-3 px-4 border-r border-gray-150">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[100px] h-[100px] rounded-md mr-2"
                        />
                      </td>
                      <td className="py-3 px-4 border-r border-gray-150">
                        {product.name}
                      </td>

                      <td className="py-3 px-4 border-r border-gray-150">
                        {product.purchasePrice}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-150">
                        {product.sellingPrice}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-150">
                        {product.currentStock}
                      </td>
                      <td className="py-3 px-4 border-r border-gray-150">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.productType === "Variable"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {product.productType}
                        </span>
                      </td>
                      {/* <td className="py-3 px-4 border-r border-gray-150">
                        {product.category}
                      </td> */}
                      <td className="py-3 px-4 border-r border-gray-150">
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {product.maincategory}
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-green-700 rounded-full text-xs font-medium">
                            {product.subcategory}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 border-r border-gray-150">
                        {product.brand}
                      </td>

                      <td className="py-3 px-4 border-r border-gray-150">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(product.id)}
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(product.id)}
                          >
                            <FaTrash className="w-4 h-4" />{" "}
                          </button>
                          {/* <button className="text-green-500 hover:text-green-700">
                          <FaEye className="w-4 h-4" />
                        </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-6 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
