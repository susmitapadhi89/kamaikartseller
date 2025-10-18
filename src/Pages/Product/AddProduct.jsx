// AddProduct.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CreateProduct } from "../../Redux/Features/ProductServicesSlice";
import { ProductForm } from "./ProductForm";

export const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (productData) => {
    try {
      await dispatch(CreateProduct(productData)).unwrap();
      toast.success("Product created successfully!");
      navigate("/products"); // Redirect to products list
    } catch (error) {
      toast.error(
        error?.message || "Failed to create product. Please try again."
      );
      throw error;
    }
  };

  //form data convert

  return <ProductForm mode="add" onSubmit={handleSubmit} />;
};
