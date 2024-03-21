import { useCombobox } from "downshift";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  FloatingPortal,
} from "@floating-ui/react";
import { useState } from "react";
import Input from "@/components/Input";
import cn from "@/lib/cn";
import { matchSorter } from "match-sorter";
import { Check } from "lucide-react";

const fetch = [
  { id: "1", nationality: "Singaporean" },
  { id: "2", nationality: "Malaysian" },
  { id: "3", nationality: "Indonesian" },
  { id: "4", nationality: "Filipino" },
  { id: "5", nationality: "Vietnamese" },
  { id: "6", nationality: "Thai" },
  { id: "7", nationality: "Myanmar" },
  { id: "8", nationality: "Cambodian" },
  { id: "9", nationality: "Laotian" },
  { id: "10", nationality: "Bruneian" },
  { id: "11", nationality: "Timorese" },
  { id: "12", nationality: "Chinese" },
];

const stateReducer = (state, actionAndChanges) => {
  const { type, changes } = actionAndChanges;
  switch (type) {
    case useCombobox.stateChangeTypes.InputClick:
      return {
        ...changes,
        isOpen: state.isOpen, // do not toggle the menu when input is clicked.
      };
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex,
        inputValue: "",
      };
    case useCombobox.stateChangeTypes.InputBlur:
      return {
        ...changes,
        inputValue: "",
      };
    default:
      return changes;
  }
};

const DownshiftExamples = () => {
  const [items, setItems] = useState(fetch);

  // Trying multiple selected items
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    isOpen,
    openMenu,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items,
    itemToString: (item) => {
      return item ? item.nationality : "";
    },
    onInputValueChange: ({ inputValue }) => {
      setItems(
        matchSorter(fetch, inputValue, {
          keys: ["nationality"],
          baseSort: (a, b) => {
            return a.index < b.index ? -1 : 1;
          },
        }),
      );
    },
    stateReducer,
    selectedItem: null, // Custom
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;
      const index = selectedItems.indexOf(selectedItem);
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)]);
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    middleware: [
      offset(8),
      size({
        apply({ availableHeight, rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.max(250, availableHeight / 3)}px`,
          });
        },
      }),
      flip({
        fallbackStrategy: "initialPlacement",
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const menuClassNames = cn(
    "absolute z-50 w-full overflow-scroll rounded-lg bg-white shadow-md",
    {
      border: isOpen && items.length > 0,
    },
  );

  const itemClassNames = cn(
    "p-2 data-[highlighted=true]:bg-blue-100 data-[selected=true]:font-semibold",
  );

  // Need to use suppressRefError: true due to FloatingPortal
  // https://github.com/downshift-js/downshift/issues/1272

  const placeholder = selectedItems.map((item) => item.nationality).join(", ");

  return (
    <div data-control="combobox-input">
      <h1>{selectedItems.length}</h1>
      <div ref={refs.setReference}>
        <Input
          label={`Nationality: ${selectedItem?.nationality}`}
          placeholder={placeholder}
          className="placeholder-black"
          {...getInputProps({
            onFocus: () => {
              // This work together with stateReducer
              if (!isOpen) {
                openMenu();
              }
            },
          })}
        />
      </div>

      <FloatingPortal>
        <ul
          style={floatingStyles}
          className={menuClassNames}
          {...getMenuProps(
            {
              ref: refs.setFloating,
            },
            { suppressRefError: true },
          )}
        >
          {isOpen && (
            <>
              {items.map((item, index) => (
                <li
                  key={item.id}
                  data-highlighted={highlightedIndex === index}
                  data-selected={selectedItem?.id === item.id}
                  className={itemClassNames}
                  {...getItemProps({ item, index })}
                >
                  <div className="flex items-center gap-2">
                    {selectedItems.includes(item) ? (
                      <Check size={16} strokeWidth={2} />
                    ) : (
                      <div className="invisible w-4" />
                    )}
                    {item.nationality}
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </FloatingPortal>
    </div>
  );
};

export default DownshiftExamples;
