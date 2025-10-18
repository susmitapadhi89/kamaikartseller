import { useState, useEffect, useCallback } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaChevronUp,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Import actions and slices
import {
  DeleteProductbyID,
  GetAllProductdata,
} from "../../Redux/Features/ProductServicesSlice";
import { GetAllBrandData } from "../../Redux/Features/BrandSerivicesSlice";
import {
  clearSubAndSubSub,
  GetMainCategoryData,
  GetSubCategoryBYID,
  GetSubSubCategoryBYID,
} from "../../Redux/Features/CategoryServicesSlice";
import { Pagination } from "../../Component/Pagination/Pagination";
import { DataTable } from "../../Component/Table/ShowDataTable";

export const ListProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors
  const { MainCategorydata, SubCategorydata, SubSubCategorydata } = useSelector(
    (state) => state.CategoryOpration
  );
  const {
    Products,
    loading,
    producterror,
    Pagination: paginationInfo,
  } = useSelector((state) => state.ProductOpration);
  const { BrandValue } = useSelector((state) => state.BrandOpration);

  // State management
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

  // Table columns configuration
  const productColumns = [
    {
      key: "image",
      title: "Image",
      render: (product) => (
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-md object-cover border"
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />
      ),
    },
    {
      key: "name",
      title: "Product",
      render: (product) => (
        <div>
          <div className="font-medium text-gray-900">{product.name}</div>
        </div>
      ),
    },
    {
      key: "purchasePrice",
      title: "Purchase Price",
      render: (product) => (
        <span className="font-medium">₹{product.purchasePrice}</span>
      ),
    },
    {
      key: "sellingPrice",
      title: "Selling Price",
      render: (product) => (
        <span className="font-medium text-green-600">
          ₹{product.sellingPrice}
        </span>
      ),
    },
    {
      key: "currentStock",
      title: "Stock",
      render: (product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.currentStock > 10
              ? "bg-green-100 text-green-800"
              : product.currentStock > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.currentStock}
        </span>
      ),
    },
    {
      key: "productType",
      title: "Type",
      render: (product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.productType === "Variable"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {product.productType}
        </span>
      ),
    },
    {
      key: "category",
      title: "Category",
      render: (product) => (
        <div className="flex flex-col gap-1">
          {product.maincategory && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              {product.maincategory}
            </span>
          )}
          {product.subcategory && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              {product.subcategory}
            </span>
          )}
          {product.category && product.category !== "-" && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              {product.category}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "brand",
      title: "Brand",
      render: (product) => (
        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
          {product.brand}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (product) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors"
            onClick={() => handleEdit(product.id)}
            title="Edit Product"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 transition-colors"
            onClick={() => handleDelete(product.id)}
            title="Delete Product"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Data transformation
  const transformProducts = useCallback((data) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((p) => {
      if (p.product_type === "simple") {
        const v = p.variants?.[0] || {};
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
        const prices = p.variants?.map((v) => v.price) || [0];
        const sellingPrices = p.variants?.map((v) => v.selling_price) || [0];
        return {
          id: p.id,
          name: p.name,
          unit: p.unit || "-",
          purchasePrice: `${Math.min(...prices)} - ${Math.max(...prices)}`,
          sellingPrice: `${Math.min(...sellingPrices)} - ${Math.max(
            ...sellingPrices
          )}`,
          currentStock:
            p.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0,
          productType: "Variable",
          category: p.childCategory_name
            ? p.childCategory_name
            : p.subCategory_name || "-",
          maincategory: p.mainCategory_name,
          subcategory: p.subCategory_name,
          brand: p.brand || "-",
          sku: p.variants?.map((v) => v.sku).join(", ") || "-",
          image: p.images?.[0]?.image_url || "/placeholder.png",
        };
      }
    });
  }, []);

  // Fetch products with filters
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

  // Fetch initial data
  useEffect(() => {
    dispatch(GetMainCategoryData());
    dispatch(GetAllBrandData());
  }, [dispatch]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [filters.searchTerm]);

  // Category handlers
  const Handlesubcategoryfetch = useCallback(
    (mainId) => {
      if (mainId && mainId !== "All") {
        dispatch(GetSubCategoryBYID(mainId));
        dispatch(clearSubAndSubSub());
      }
    },
    [dispatch]
  );

  const Handlesubsubcategoryfetch = useCallback(
    (subcategoryID) => {
      if (subcategoryID && subcategoryID !== "All") {
        dispatch(GetSubSubCategoryBYID(subcategoryID));
      }
    },
    [dispatch]
  );

  // Delete handler
  const handleDelete = useCallback(
    async (id) => {
      if (!id) return;

      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }

      try {
        const res = await dispatch(DeleteProductbyID(id)).unwrap();
        toast.success(res.message || "Product deleted successfully");

        // Refresh current page data
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          brand: filters.brand !== "All" ? filters.brand : "",
          category_id: filters.maincategory || "",
          subcategory_id: filters.subcategory || "",
          childcategory_id: filters.childcategory || "",
          type: filters.productType !== "All" ? filters.productType : "",
        };
        dispatch(GetAllProductdata(params));
      } catch (error) {
        toast.error(error.message || "Failed to delete product");
      }
    },
    [dispatch, currentPage, itemsPerPage, debouncedSearch, filters]
  );

  // Edit handler
  const handleEdit = (productId) => {
    navigate(`/seller/product/edit/${productId}`);
  };

  // Filter handlers
  const updateFilter = (key, value) => {
    setFilters((prev) => {
      let newValue = value === "All" ? "" : value;
      let newFilters = { ...prev, [key]: newValue };

      if (key === "maincategory") {
        newFilters.subcategory = "";
        newFilters.childcategory = "";
        if (newValue) {
          Handlesubcategoryfetch(newValue);
        }
      }

      if (key === "subcategory") {
        newFilters.childcategory = "";
        if (newValue) {
          Handlesubsubcategoryfetch(newValue);
        }
      }

      return newFilters;
    });
    setCurrentPage(1);
  };

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

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Show error state
  if (producterror) {
    return (
      <div className="container mx-auto px-2 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Failed to load products
          </div>
          <div className="text-red-500">{producterror}</div>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products List</h1>
          <p className="text-gray-600 mt-1">Manage your products inventory</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Search and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <input
                type="text"
                placeholder="Search products by name"
                className="pl-3 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                value={filters.searchTerm}
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="button"
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-center whitespace-nowrap transition-colors"
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
              className="bg-primary hover:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center whitespace-nowrap w-full md:w-auto transition-colors"
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
                  All Types
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
                  All Brands
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

            {/* Main Category Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Main Category</InputLabel>
              <Select
                value={filters.maincategory || "All"}
                label="MainCategory"
                onChange={(e) => {
                  updateFilter("maincategory", e.target.value);
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
                  All Categories
                </MenuItem>
                {Array.isArray(MainCategorydata) &&
                MainCategorydata.length > 0 ? (
                  MainCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Category"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Categories Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Sub Category Filter */}
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
                }}
              >
                <MenuItem value="All" sx={{ color: "grey" }}>
                  All Sub Categories
                </MenuItem>
                {Array.isArray(SubCategorydata) &&
                SubCategorydata.length > 0 ? (
                  SubCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Sub Category"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Sub Categories Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Child Category Filter */}
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
                  All Child Categories
                </MenuItem>
                {Array.isArray(SubSubCategorydata) &&
                SubSubCategorydata.length > 0 ? (
                  SubSubCategorydata.map((data) => (
                    <MenuItem
                      key={data?.id}
                      value={data?.id}
                      disabled={!data?.id}
                    >
                      {data?.name || "Unnamed Child Category"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Child Categories Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls - Top */}
      <Pagination
        currentPage={currentPage}
        totalPages={paginationInfo?.totalPages || 1}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={paginationInfo?.totalItems}
        showItemsPerPage={true}
      />

      {/* Data Table */}
      <DataTable
        columns={productColumns}
        data={transformProducts(Products)}
        loading={loading}
        emptyMessage="No products found. Try adjusting your filters or add new products."
      />
    </div>
  );
};
