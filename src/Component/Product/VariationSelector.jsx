import VariationOptions from "./VariationOption";
import VariantsList from "./VariationList";

const VariationSection = ({
  options,
  variants,
  attributeOptions,
  addOption,
  updateOption,
  updateValues,
  removeOption,
  updateVariant,
  handleVariantImageUpload,
  removeVariantImage,
  mode,
  product,
  errors,
}) => {
  return (
    <section className="p-6 border rounded-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Product Variations
      </h2>

      <VariationOptions
        options={options}
        attributeOptions={attributeOptions}
        addOption={addOption}
        updateOption={updateOption}
        updateValues={updateValues}
        removeOption={removeOption}
        mode={mode}
      />

      {variants.length > 0 && (
        <VariantsList
          variants={variants}
          updateVariant={updateVariant}
          handleVariantImageUpload={handleVariantImageUpload}
          removeVariantImage={removeVariantImage}
          product={product}
          errors={errors}
        />
      )}
    </section>
  );
};

export default VariationSection;
