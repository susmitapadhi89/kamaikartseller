import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAttributeData } from "../../Redux/Features/AttributeServicesSlice";

const VariationOptions = ({
  options,
  addOption,
  updateOption,
  updateValues,
  removeOption,
  mode,
}) => {
  const dispatch = useDispatch();
  const { AttributeValue, loading, error } = useSelector(
    (state) => state.AttributeOpration
  );

  useEffect(() => {
    dispatch(GetAllAttributeData());
    // 🔹 Fetch attributes from API
  }, [dispatch, options]);
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 text-gray-800">
        Variation Options
      </h3>

      {options.map((opt, i) => (
        <div
          key={i}
          className="mb-4 p-4 border border-gray-200 rounded-md bg-white shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-3 items-start">
            {/* Attribute dropdown */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attribute *
              </label>

              <select
                value={opt.attribute_id}
                onChange={(e) =>
                  updateOption(i, "attribute_id", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select Attribute</option>
                {(AttributeValue || []).map((attr) => (
                  <option
                    key={attr.id}
                    value={attr.id}
                    disabled={options.some(
                      (o, idx) =>
                        idx !== i && String(o.attribute_id) === String(attr.id)
                    )}
                  >
                    {attr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Multi-select for attribute values */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Values *
              </label>

              <div className="rounded-md">
                <select
                  value=""
                  onChange={(e) => {
                    const attr = AttributeValue.find(
                      (a) => String(a.id) === String(opt.attribute_id)
                    );
                    if (!attr) return;

                    const selected = attr.values.find(
                      (val) => String(val.id) === String(e.target.value)
                    );

                    if (
                      selected &&
                      !opt.values.some(
                        (v) =>
                          String(v.attribute_value_id) === String(selected.id)
                      )
                    ) {
                      updateValues(i, [
                        ...opt.values,
                        {
                          attribute_id: attr.id,
                          attribute_value_id: selected.id,
                          value: selected.value,
                        },
                      ]);
                    }
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={!opt.attribute_id}
                >
                  <option value="">
                    {opt.attribute_id
                      ? "Select Value"
                      : "Select attribute first"}
                  </option>
                  {opt.attribute_id &&
                    AttributeValue.find(
                      (a) => String(a.id) === String(opt.attribute_id)
                    )?.values.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.value}
                      </option>
                    ))}
                </select>
                {/* <select
                  value=""
                  onChange={(e) => {
                    const attr = AttributeValue.find(
                      (a) => String(a.id) === String(opt.attribute_id)
                    );
                    if (!attr) return;

                    const selected = attr.values.find(
                      (val) => String(val.id) === String(e.target.value)
                    );
                    if (!selected) return;

                    // Check if the value is already selected
                    const exists = opt.values.some(
                      (v) =>
                        String(v.attribute_value_id) === String(selected.id)
                    );
                    if (exists) return;

                    // Send only the new value in edit mode
                    updateValues(
                      i,
                      [
                        {
                          attribute_id: attr.id,
                          attribute_value_id: selected.id,
                          value: selected.value,
                        },
                      ],
                      selected.id // optional, if you want to remove old variant
                    );
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={!opt.attribute_id}
                >
                  <option value="">
                    {opt.attribute_id
                      ? "Select Value"
                      : "Select attribute first"}
                  </option>

                  {opt.attribute_id &&
                    AttributeValue.find(
                      (a) => String(a.id) === String(opt.attribute_id)
                    )?.values.map((val) => (
                      <option
                        key={val.id}
                        value={val.id}
                        disabled={opt.values.some(
                          (v) => String(v.attribute_value_id) === String(val.id)
                        )}
                      >
                        {val.value}
                      </option>
                    ))}
                </select> */}

                {/* Selected values as chips - moved BELOW */}
                {opt.values.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {opt.values.map((val) => (
                      <span
                        key={val.attribute_value_id}
                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {val.value}
                        <button
                          type="button"
                          onClick={() => {
                            updateValues(
                              i,
                              opt.values.filter(
                                (v) =>
                                  v.attribute_value_id !==
                                  val.attribute_value_id
                              ),
                              val.attribute_value_id //editproduct mate che varientdeletkarva
                            );
                          }}
                          className="ml-1.5 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="self-end md:self-center">
              <button
                type="button"
                onClick={() => removeOption(i)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center"
                aria-label="Remove variation option"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addOption}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center font-medium"
      >
        Add Variation Option
      </button>
    </div>
  );
};

export default VariationOptions;
