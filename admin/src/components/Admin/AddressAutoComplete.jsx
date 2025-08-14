import { useState } from "react";
import { useCombobox } from "downshift";
import axios from "axios";
import UseDebounce from "../../hooks/UseDebounce";

function AddressAutocomplete({ onPlaceSelected }) {
  const [items, setItems] = useState([]);
  const apiKey = import.meta.env.VITE_GEOENCODING_API;

  const fetchAddresses = UseDebounce(async (inputValue) => {
    if (!inputValue || inputValue.length < 3) {
      setItems([]);
      return;
    }
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        inputValue
      )}&apiKey=${apiKey}&limit=5`;
      const response = await axios.get(url);
      setItems(response.data.features || []);
    } catch (error) {
      console.error("Error fetching address:", error);
      setItems([]);
    }
  }, 500);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    itemToString: (item) => (item ? item.properties.formatted : ""),
    onInputValueChange: ({ inputValue }) => {
      fetchAddresses(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onPlaceSelected(selectedItem.properties);
      }
    },
  });

  return (
    <div className="relative w-full">
      <input
        {...getInputProps()}
        placeholder="Enter address here..."
        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
      />

      <ul
        {...getMenuProps()}
        className={`absolute text-black z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
          !isOpen && "hidden"
        }`}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`px-3 py-2 cursor-pointer ${
                highlightedIndex === index ? "bg-blue-100" : ""
              }`}
              key={item.properties.place_id}
              {...getItemProps({ item, index })}
            >
              {item.properties.formatted}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AddressAutocomplete;
