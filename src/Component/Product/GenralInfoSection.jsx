import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ProductTypeSelector from "./ProductTypeSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMainCategoryData,
  GetSubCategoryBYID,
  GetSubSubCategoryBYID,
  clearSubAndSubSub,
} from "../../Redux/Features/CategoryServicesSlice";
import { useCallback, useEffect, useState } from "react";
import CategoryDropdown from "../CustomeDropDown/DropDown";
import { GetAllBrandData } from "../../Redux/Features/BrandSerivicesSlice";
const GeneralInfoSection = ({
  product,
  setProduct,
  editorState,
  setEditorState,
  handleChange, //  units,
  errors,
  setOptions,
  setVariants,
}) => {
  const dispatch = useDispatch();
  const {
    MainCategorydata,
    SubCategorydata,
    SubSubCategorydata,
    // loading,
    // error,
  } = useSelector((state) => state.CategoryOpration);

  const { BrandValue, Brandloading, Branderror } = useSelector(
    (state) => state.BrandOpration
  );

  const [refreshSubCategory, setRefreshSubCategory] = useState(false);
  const [refreshSubSubCategory, setRefreshSubSubCategory] = useState(false);

  useEffect(() => {
    dispatch(GetMainCategoryData());
    dispatch(GetAllBrandData());
  }, [dispatch]);

  const Handlesubcategoryfetch = useCallback(
    (mainId) => {
      dispatch(GetSubCategoryBYID(mainId));
      dispatch(clearSubAndSubSub());

      setProduct((prev) => ({
        ...prev,
        maincategory_id: mainId,
        subcategory_id: "", // reset children
        category_id: "",
      }));

      setRefreshSubCategory((prev) => !prev);
      setRefreshSubSubCategory((prev) => !prev);
    },

    [dispatch, setProduct] // stable dependency
  );

  const Handlesubsubcategoryfetch = useCallback(
    (subcategoryID) => {
      dispatch(GetSubSubCategoryBYID(subcategoryID));

      setProduct((prev) => ({
        ...prev,
        subcategory_id: subcategoryID, // reset children
        category_id: "",
      }));

      setRefreshSubSubCategory((prev) => !prev); // toggle refresh flag
    },
    [dispatch, setProduct] // stable dependency
  );

  //Edit mate
  useEffect(() => {
    if (product?.maincategory_id) {
      dispatch(GetSubCategoryBYID(product.maincategory_id));
    }
  }, [dispatch, product?.maincategory_id]);

  useEffect(() => {
    if (product?.subcategory_id) {
      dispatch(GetSubSubCategoryBYID(product.subcategory_id));
    }
  }, [dispatch, product?.subcategory_id]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        General Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            required
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <CategoryDropdown
            data={BrandValue || []}
            title={"Select Brand"}
            lable={"Brand"}
            handleselected={(item) =>
              setProduct((prev) => ({
                ...prev,
                brand: item.name,
              }))
            }
            selectedValue={product.brand}
          />
          {errors.brand && (
            <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
          )}
        </div>

        <div>
          <CategoryDropdown
            data={MainCategorydata}
            title={"Select Main Category"}
            lable={"Main Category"}
            handleselected={(item) => {
              Handlesubcategoryfetch(item.id);
            }}
            selectedValue={product.maincategory_id}
          />
          {errors.maincategory && (
            <p className="mt-1 text-sm text-red-600">{errors.maincategory}</p>
          )}
        </div>

        <div>
          <CategoryDropdown
            data={SubCategorydata}
            title={"Select Sub Category"}
            lable={"Sub Category"}
            handleselected={(item) => {
              Handlesubsubcategoryfetch(item.id);
            }}
            selectedValue={product.subcategory_id}
            refresh={refreshSubCategory}
            onResetComplete={() => setRefreshSubSubCategory(false)}
          />
          {errors.subcategory && (
            <p className="mt-1 text-sm text-red-600">{errors.subcategory}</p>
          )}
        </div>

        <div>
          <CategoryDropdown
            data={SubSubCategorydata}
            title={"Select Child Category"}
            lable={"Child Category"}
            handleselected={(item) =>
              setProduct((prev) => ({
                ...prev,
                category_id: item.id,
              }))
            }
            selectedValue={product.category_id}
            refresh={refreshSubSubCategory}
            onResetComplete={() => setRefreshSubSubCategory(false)}
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit *
          </label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.unit ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            {units.map((unit, i) => (
              <option key={i} value={unit}>
                {unit.toUpperCase()}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
          )}
        </div> */}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbarClassName="border-b border-gray-200"
              editorClassName="px-4 min-h-[150px]"
              placeholder="Write your product description here..."
              toolbar={{
                options: [
                  "inline",
                  "blockType", // 👈 enables headings
                  "fontSize",
                  "list",
                  "textAlign",
                  "link",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
                blockType: {
                  inDropdown: true, // 👈 puts headings in dropdown
                  options: ["Normal", "H1", "H2", "H3", "H4", "Blockquote"],
                },
              }}
            />
          </div>
        </div>

        {/* <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fabric/Material
          </label>
          <input
            type="text"
            name="fabric"
            value={product.fabric}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="E.g., Cotton, Polyester, etc."
          />
        </div> */}
      </div>

      <ProductTypeSelector
        product={product}
        setVariants={setVariants}
        setProduct={setProduct}
        setOptions={setOptions}
      />
    </section>
  );
};

export default GeneralInfoSection;
