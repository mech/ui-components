import { useCombobox, useMultipleSelection } from "downshift";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  size,
  FloatingPortal,
} from "@floating-ui/react";
import cn from "@/lib/cn";
import { useState, useId } from "react";
import { Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { useController } from "react-hook-form";

const sizeVariants = cva([], {
  variants: {
    size: {
      sm: ["px-2 py-1 text-sm"],
      md: ["p-1.5 text-base"], // p-[0.3125rem]
      lg: ["text-lg"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

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
  const { type, changes, index } = actionAndChanges;

  switch (type) {
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex, // To maintain selection position at dropdown
      };
    default:
      return changes;
  }
};

const MultipleSelectionDownshiftExamples = ({
  name,
  requiredMessage,
  defaultValue,
}) => {
  const [items, setItems] = useState(fetch);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { field } = useController({
    name,
    rules: { required: requiredMessage },
    defaultValue,
  });

  const handleOnChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    field.onChange(selectedItems);
  };

  // useMultipleSelection
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection({
    selectedItems,
    onStateChange: ({ selectedItems: newSelectedItems, type }) => {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          // setSelectedItems(newSelectedItems);
          handleOnChange(newSelectedItems);
          break;
        default:
          break;
      }
    },
  });

  // useCombobox
  const {
    isOpen,
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
    defaultHighlightedIndex: 0,
    inputValue,
    stateReducer,
    selectedItem: null,
    onStateChange: ({
      inputValue: newInputValue,
      selectedItem: newSelectedItem,
      type,
    }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            const newSelectedItems = [...selectedItems, newSelectedItem];

            // setSelectedItems(newSelectedItems);
            // field.onChange(newSelectedItems);
            handleOnChange(newSelectedItems);

            setInputValue("");
          }
          break;
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  // useFloating
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

  const labelClassNames = cn(
    "absolute -top-3 left-2 bg-background px-1 text-sm text-foreground",
  );
  const menuClassNames = cn(
    "absolute z-50 w-full overflow-scroll rounded-lg bg-popover shadow-md",
    {
      border: isOpen && items.length > 0,
    },
  );
  const itemClassNames = cn(
    "p-2 data-[highlighted=true]:bg-blue-500 data-[highlighted=true]:text-white [&>*]:data-[selected=true]:font-semibold",
    "dark:data-[highlighted=true]:bg-popover-focus",
  );

  return (
    <div data-control="multiple-selection-combobox-input">
      <div
        ref={refs.setReference}
        className={cn(
          "group relative flex w-full rounded-md border border-input text-black transition ease-in-out file:border-0 file:bg-transparent focus-within:border-blue-600 focus-within:text-blue-500 focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-opacity-30 focus:outline-none data-[invalid=true]:border-red-500 data-[invalid=true]:ring-4 data-[invalid=true]:ring-red-500 data-[invalid=true]:ring-opacity-30",
        )}
      >
        <label className={labelClassNames} {...getLabelProps()}>
          Nationality
        </label>
        <div className="flex w-full flex-wrap items-center gap-1 px-1">
          {selectedItems.map((selectedItem, index) => {
            return (
              <span
                key={`selected-item-${index}`}
                className="cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-sm text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
                {...getSelectedItemProps({ selectedItem, index })}
              >
                {selectedItem.nationality}
              </span>
            );
          })}

          <div className="flex grow gap-0.5">
            <input
              className={cn(
                sizeVariants(),
                "order-2 w-full appearance-none rounded-md bg-background text-black text-foreground outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              )}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
        </div>
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
                  data-list={true}
                  data-highlighted={highlightedIndex === index}
                  data-selected={
                    selectedItem?.id === item.id || selectedItems.includes(item)
                  }
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

export default MultipleSelectionDownshiftExamples;
