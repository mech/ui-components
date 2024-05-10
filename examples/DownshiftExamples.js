import { useCombobox } from "downshift";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  size,
  FloatingPortal,
} from "@floating-ui/react";
import { useState } from "react";
import Input from "@/components/Input";
import cn from "@/lib/cn";
import { matchSorter } from "match-sorter";
import { Check, CircleX } from "lucide-react";
import button from "@/components/Button";
import { FormProvider, useForm } from "react-hook-form";

const fetch = [
  { id: "0", nationality: "NULL" },
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
        isOpen: state.isOpen,
        // isOpen: true, // do not toggle the menu when input is clicked.
      };
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex,
        inputValue: "", // If we disallow custom value
      };
    case useCombobox.stateChangeTypes.InputBlur:
      // Seems like iOS will invoke this
      console.log("Input is blur!!");

      return {
        ...changes,
        isOpen: state.isOpen,
        inputValue: "", // If we disallow custom value
      };
    default:
      return changes;
  }
};

const DownshiftExamples = () => {
  const form = useForm({});
  const [items, setItems] = useState(fetch);

  // Trying multiple selected items
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    isOpen,
    openMenu,
    closeMenu,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    selectItem,
  } = useCombobox({
    items,
    itemToString: (item) => {
      return item ? item.nationality : "";
    },
    onInputValueChange: ({ inputValue }) => {
      // How you filter the items in the list. You can either filter by
      // querying the DB or use matchSorter if all items are downloaded.

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
    "z-50 w-full overflow-scroll rounded-lg bg-white shadow-md",
    {
      border: isOpen && items.length > 0,
    },
  );

  // [&>*] - https://github.com/tailwindlabs/tailwindcss/discussions/10301
  const itemClassNames = cn(
    "p-2 data-[highlighted=true]:bg-blue-100 [&>*]:data-[selected=true]:font-semibold",
  );

  // Need to use suppressRefError: true due to FloatingPortal
  // https://github.com/downshift-js/downshift/issues/1272

  const placeholder = selectedItems.map((item) => item.nationality).join(", ");

  return (
    <div data-control="combobox-input">
      <div ref={refs.setReference}>
        <FormProvider {...form}>
          <Input
            name="downshift-1"
            suffix={
              <button
                onClick={() => {
                  setSelectedItems([]);
                  selectItem(null);
                }}
              >
                <CircleX size={24} />
              </button>
            }
            // label={`Nationality: ${selectedItems.length} picked`}
            label="A"
            placeholder={placeholder}
            className="placeholder-black"
            {...getInputProps({
              onFocus: () => {
                // This work together with stateReducer
                if (!isOpen) {
                  openMenu();
                }
              },
              onBlur: () => {
                closeMenu();
              },
            })}
          />
        </FormProvider>
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
              {items.map((item, index) => {
                const selected =
                  selectedItem?.id === item.id || selectedItems.includes(item);

                return (
                  <li
                    key={item.id}
                    data-list={true}
                    data-highlighted={highlightedIndex === index}
                    data-selected={selected}
                    className={itemClassNames}
                    {...getItemProps({ item, index })}
                  >
                    <div className="flex items-center gap-2">
                      {selected ? (
                        <Check size={16} strokeWidth={2} />
                      ) : (
                        <div className="invisible w-4" />
                      )}
                      {item.nationality}
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </FloatingPortal>
    </div>
  );
};

export default DownshiftExamples;
