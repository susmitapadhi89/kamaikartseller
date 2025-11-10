import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetProductdatabyId,
  UpdateProduct,
  resetProductData,
} from "../../Redux/Features/ProductServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductForm } from "./ProductForm";
import toast from "react-hot-toast";

export const EditProduct = () => {
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const productIdInt = parseInt(productId, 10);

  // helper function (file અંદર રાખી દે)
  // function normalizeAttributes(attributesObj) {
  //   if (!attributesObj) return [];
  //   console.log(attributesObj, "sohan");

  //   console.log(attributesObj);

  //   return Object.keys(attributesObj).map((attrId) => ({
  //     attribute_id: attrId,
  //     values: attributesObj[attrId].map((v) => ({
  //       attribute_value_id: v.id,
  //       value: v.value,
  //     })),
  //   }));
  // }
  function normalizeAttributes(attributesObj) {
    if (!attributesObj) return [];

    // Convert each key/value pair into the desired format
    return Object.entries(attributesObj).map(([attrId, values]) => ({
      attribute_id: attrId, // the key, e.g., "21"
      values: values.map((v) => ({
        attribute_id: attrId,
        attribute_value_id: v.id, // e.g., "40"
        value: v.value, // e.g., "S"
      })),
    }));
  }

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { PersonalProductdata, producterror, loading } = useSelector(
    (state) => state.ProductOpration
  );

  //edit product mate
  useEffect(() => {
    dispatch(resetProductData());
    setProductData(null);

    dispatch(GetProductdatabyId({ id: productIdInt }));

    return () => {
      dispatch(resetProductData());
    };
  }, [dispatch, productIdInt]);

  useEffect(() => {
    if (!PersonalProductdata) return; // ⬅️ bail out if still null

    if (PersonalProductdata) {
      const prod = PersonalProductdata;

      const baseData = {
        name: prod.name,
        brand: prod.brand,
        description: prod.description,
        maincategory_id: prod.maincategory_id,
        subcategory_id: prod.subcategory_id,
        category_id: prod.category_id || "",
        type: prod.product_type === "variable" ? "variant" : "simple",
      };

      if (prod.product_type === "variable") {
        const variantsWithImages = (prod.variants || []).map((v) => ({
          ...v,
          images: (prod.images || [])
            .filter((img) => img.variant_id === v.id)
            .map((img) => ({
              id: img.id,
              url: img.image_url, // keeping url key clean instead of image_url
            })),
        }));

        const normalizedAttributes = normalizeAttributes(prod.attributes);

        setProductData({
          ...baseData,
          attributes: normalizedAttributes, // ensure new array
          variants: [...variantsWithImages], // ensure new array
        });
      } else {
        setProductData({
          ...baseData,
          price: prod.variants?.[0]?.price || prod.price || "",
          selling_price:
            prod.variants?.[0]?.selling_price || prod.selling_price || "",
          stock: prod.variants?.[0]?.stock || prod.stock || "",
          shipping_cost:
            prod.variants?.[0]?.shipping_cost || prod.shipping_cost || "",
          //   images: [...(prod.images?.map((img) => img.image_url) || [])], // new array
          images:
            prod.images?.map((img) => ({
              id: img.id,
              image_url: img.image_url,
            })) || [],
        });
      }
    }
  }, [PersonalProductdata]);
  const handleSubmit = async (productData) => {
    try {
      await dispatch(
        UpdateProduct({ id: productIdInt, data: productData })
      ).unwrap();
      toast.success("Product Updated successfully!");
      navigate("/products"); // Redirect to products list
    } catch (error) {
      toast.error(
        error?.message || "Failed to create product. Please try again."
      );
      throw error;
    }
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <ProductForm
      mode="edit"
      initialData={productData}
      onSubmit={handleSubmit}
      product_id={productId}
    />
  );
};
