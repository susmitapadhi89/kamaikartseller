import { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toast from "react-hot-toast";
// Import components
import ProductHeader from "../../Component/Product/ProductHeader";
import GeneralInfoSection from "../../Component/Product/GenralInfoSection";
import PricingSection from "../../Component/Product/PriceSection";
import VariationSection from "../../Component/Product/VariationSelector";
import MediaSection from "../../Component/Product/MediaSection";

import { useSelector } from "react-redux";
import htmlToDraft from "html-to-draftjs";
export const ProductForm = ({ mode, initialData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const initialProductState = useMemo(
    () => ({
      name: "",
      maincategory_id: "",
      subcategory_id: "",
      category_id: "",
      brand: "",
      selling_price: "",
      price: "",
      stock: "",
      description: "",
      images: [],
      shipping_cost: "",
      colors: [],
      sizes: [],
      attributes: [],
      status: true,
      type: "simple",
      image_ids_to_delete: [],
    }),
    []
  );
  const [product, setProduct] = useState(initialProductState);

  const sellerData = JSON.parse(localStorage.getItem("seller"));
  const sellerId = sellerData?.id;

  // eslint-disable-next-line no-unused-vars
  const { Products, producterror, loading } = useSelector(
    (state) => state.ProductOpration
  );

  const getDescriptionHTML = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(rawContentState); // gives full HTML with tags
  };
  // Variation management state

  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "images") {
      setProduct({ ...product, images: [...files] });
    } else if (name === "thumbnail") {
      setProduct({ ...product, thumbnail: files[0] });
    } else if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));
    e.target.value = null;
  }, []);

  const removeImage = useCallback((index) => {
    setProduct((prev) => {
      const imgs = [...prev.images];
      const [removed] = imgs.splice(index, 1);
      return {
        ...prev,
        images: imgs,
        image_ids_to_delete: removed?.id
          ? [...(prev.image_ids_to_delete || []), removed.id]
          : prev.image_ids_to_delete || [],
      };
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!product.name.trim()) newErrors.name = "Product name is required";

    if (!product.maincategory_id)
      newErrors.maincategory = "Category is required";
    if (!product.subcategory_id)
      newErrors.subcategory = "SubCategory is required";
    if (!product.brand) newErrors.brand = "brand is required";

    // Price validation
    if (product.type === "simple") {
      if (!product.price || parseFloat(product.price) <= 0) {
        newErrors.price = "Valid original price is required";
      }
      if (!product.price || parseFloat(product.price) <= 0) {
        newErrors.price = "Valid selling price is required";
      }
      if (!product.stock || parseInt(product.stock) < 0) {
        newErrors.stock = "Valid stock is required";
      }
    }

    // Variant validation
    if (product.type === "variant" && variants.length > 0) {
      variants.forEach((variant, index) => {
        if (!variant.price || parseFloat(variant.price) <= 0) {
          newErrors[`variant-price-${index}`] =
            "Valid price is required for all variants";
        }
        if (!variant.stock || parseInt(variant.stock) < 0) {
          newErrors[`variant-stock-${index}`] =
            "Valid stock is required for all variants";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      // Prepare the final product data
      const productData = {
        ...product,
        description: getDescriptionHTML(),
        variants: product.type === "variant" ? variants : [],
      };

      const formData = buildFormData(productData);

      await onSubmit(formData);

      navigate("/seller/ListProduct");
      setProduct(initialProductState);

      setOptions([]);
      setVariants([]);
      setEditorState(EditorState.createEmpty());
      //document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(
        error?.message || "Failed to save product. Please try again."
      );

      console.error("Error submitting product:", error.message);
      setErrors({ submit: "Failed to save product. Please try again." });
    }
  };

  // Variation management functions
  const addOption = () => {
    setOptions([...options, { attribute: "", values: [] }]);
  };

  //value update kare like  size =M so after L add so they updatd nd add the value
  // const updateOption = (index, field, value) => {

  //   const updated = [...options];
  //   updated[index][field] = value;
  //   if (field === "attribute") {
  //     updated[index].values = []; // reset values if attribute changed
  //   }
  //   setOptions(updated);
  // };
  const updateOption = (index, field, value) => {
    // Only check for duplicates if updating attribute_id
    if (field === "attribute_id") {
      const isAlreadySelected = options.some(
        (opt, i) => i !== index && String(opt.attribute_id) === String(value)
      );

      if (isAlreadySelected) {
        toast.error("This attribute is already selected");
        return; // stop update
      }
    }

    const updated = [...options];
    updated[index][field] = value;

    // Reset values if attribute changed
    if (field === "attribute_id") {
      updated[index].values = [];
    }

    setOptions(updated);
  };

  const updateValues = async (index, values, deletedattributevalueid) => {
    let canUpdate = true;

    if (mode === "edit" && deletedattributevalueid) {
      canUpdate = removeOption_nd_VarientRemove(deletedattributevalueid);
    }

    // Only update values if removal was allowed
    if (!canUpdate) return;

    const updated = [...options];

    updated[index].values = values;

    setOptions(updated);
  };

  //varient create hoi e remove mate
  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Generate all variants (cartesian product)
  const generateVariants = () => {
    if (options.length === 0) return [];

    return options.reduce((acc, opt) => {
      if (opt.values.length === 0) return acc;

      if (acc.length === 0) return opt.values.map((v) => [v]);

      const newAcc = [];

      acc.forEach((a) => {
        opt.values.forEach((v) => {
          newAcc.push([...a, v]);
        });
      });

      return newAcc;
    }, []);
  };

  //varient n update kare
  const updateVariant = (index, field, value) => {
    setVariants((prev) => {
      if (field === "setAll") return value; // replace full array
      if (field === "removeAt") {
        return prev.filter((_, idx) => idx !== value);
      }

      if (field === "removeById") {
        return prev.filter((v) => v._id !== value);
      }

      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handle variant image upload
  const handleVariantImageUpload = (variantIndex, files) => {
    const updatedVariants = [...variants];
    if (!updatedVariants[variantIndex].images) {
      updatedVariants[variantIndex].images = [];
    }
    updatedVariants[variantIndex].images = [
      ...updatedVariants[variantIndex].images,
      ...files,
    ].slice(0, 5); // Limit to 5 images per variant
    setVariants(updatedVariants);
  };

  // Remove variant image
  const removeVariantImage = (variantIndex, imageIndex, imageId) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images.splice(imageIndex, 1);
    setVariants(updatedVariants);

    if (imageId) {
      setProduct((prev) => ({
        ...prev,
        image_ids_to_delete: [...prev.image_ids_to_delete, imageId],
      }));
    }
  };

  //form data convert
  const buildFormData = (product) => {
    const formData = new FormData();

    // Normal fields
    formData.append("shop_id", sellerId);
    formData.append("name", product.name);
    formData.append("maincategory_id", product.maincategory_id);
    formData.append("subcategory_id", product.subcategory_id);
    if (product.category_id) {
      formData.append("category_id", product.category_id);
    }
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("selling_price", product.selling_price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);
    formData.append("shipping_cost", product.shipping_cost);

    // Arrays / objects -> stringify
    formData.append("colors", JSON.stringify(product.colors || []));
    formData.append("sizes", JSON.stringify(product.sizes || []));
    formData.append("attributes", JSON.stringify(product.attributes || []));
    formData.append("variants", JSON.stringify(variants || []));
    formData.append(
      "image_ids_to_delete",
      JSON.stringify(product.image_ids_to_delete || [])
    );

    variants.forEach((variant, i) => {
      // images
      if (variant.images?.length > 0) {
        variant.images.forEach((file) => {
          formData.append(`variant_${i}_image`, file);
        });
      }
    });
    if (product.images?.length > 0) {
      product.images.forEach((file) => {
        formData.append("images", file);
      });
    }
    formData.append(
      "product_type",
      product.type === "variant" ? "variable" : "simple"
    );
    return formData;
  };

  //EDIT
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && initialData && Object.keys(initialData).length > 0) {
      setProduct({
        ...initialProductState,
        ...initialData,
        images: initialData.images || [],
        attributes: initialData.attributes || [],
      });

      if (initialData.variants) {
        setVariants(initialData.variants);
      }

      if (initialData.description) {
        const contentBlock = htmlToDraft(initialData.description);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
      if (initialData.attributes) {
        setOptions(initialData.attributes);
      }
      setInitialized(true);
    }
  }, [initialData, initialized, initialProductState]);

  // When options change, regenerate variants , like atribute vlaue change ty to genrate kare repeat varient
  useEffect(() => {
    if (options.length === 0) return;

    const generatedVariants = generateVariants();

    const updatedVariants = generatedVariants.map((comb) => {
      const key = comb
        .map((c) => `${c.attribute_value_id}:${c.value}`)
        .sort()
        .join("|");

      // Try to find in existing API variants (already saved)
      const existing = variants.find((v) => {
        if (!v?.attributes) return false; // ✅ safeguard

        const existingKey = v.attributes
          .map((c) => {
            // c.attribute_value might be undefined
            const id = c?.attribute_value?.id ?? c?.attribute_value_id ?? "";
            const val = c?.attribute_value?.value ?? c?.value ?? "";

            return `${id}:${val}`;
          })
          .sort()
          .join("|");

        return existingKey === key;
      });

      return existing
        ? existing // API mathi already saved → keep it
        : {
            attributes: comb,
            price: product.price || "",
            selling_price: product.selling_price || "",
            stock: product.stock || "",
            images: product.images,
          };
    });

    setVariants(updatedVariants);
  }, [options, mode]);

  //Edit product

  // attrValueId => remove કરવાનું attribute value id
  // 🔹 Remove all variants containing given attribute_value_id
  // Returns true if removal succeeded, false if blocked

  const removeOption_nd_VarientRemove = (attrValueId) => {
    if (!attrValueId) return true; // nothing to remove → proceed

    let removed = false;

    setVariants((prev = []) => {
      const filtered = prev.filter((variant) => {
        const attrs = Array.isArray(variant.attributes)
          ? variant.attributes
          : [];
        return !attrs.some(
          (a) =>
            a?.attribute_value_id === attrValueId ||
            a?.attribute_value?.id === attrValueId
        );
      });

      if (filtered.length === 0) {
        alert("At least one variant is required!");
        removed = false; // removal blocked
        return prev; // keep old state
      }

      removed = true; // removal succeeded
      return filtered;
    });

    return removed;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ProductHeader navigate={navigate} mode={mode} />

        {/* Error message for submission */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.submit}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="space-y-8">
            <GeneralInfoSection
              product={product}
              setProduct={setProduct}
              editorState={editorState}
              setEditorState={setEditorState}
              handleChange={handleChange}
              setVariants={setVariants}
              setOptions={setOptions}
              // units={units}
              errors={errors}
            />

            {product.type === "simple" && (
              <PricingSection
                product={product}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {product.type === "variant" && (
              <VariationSection
                options={options}
                variants={variants}
                addOption={addOption}
                updateOption={updateOption}
                updateValues={updateValues}
                removeOption={removeOption}
                updateVariant={updateVariant}
                handleVariantImageUpload={handleVariantImageUpload}
                removeVariantImage={removeVariantImage}
                mode={mode}
                product={product}
                errors={errors}
              />
            )}

            {product.type !== "variant" && (
              <MediaSection
                product={product}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
              />
            )}
          </div>
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 space-x-4">
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${"bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"}`}
            >
              {mode === "edit" ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
