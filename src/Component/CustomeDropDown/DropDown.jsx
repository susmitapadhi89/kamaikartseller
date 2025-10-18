import { useEffect, useState } from "react";

export default function CategoryDropdown({
  data,
  title,
  handleselected,
  lable,
  refresh,
  onResetComplete,
  selectedValue, // edit purpose
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Use selectedValue directly instead of internal state for label
  const selectedItem = data.find(
    (d) => d.id === selectedValue || d.name === selectedValue
  );

  // reset when refresh is triggered
  useEffect(() => {
    if (refresh) {
      // Notify parent that reset is complete
      if (onResetComplete) onResetComplete();
    }
  }, [refresh, onResetComplete]);

  const handleClick = (item) => {
    setIsOpen(false);
    handleselected(item);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {lable}
      </label>

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer flex justify-between items-center"
      >
        {selectedItem?.name || title}
        <span>▼</span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
