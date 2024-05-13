import { useCombobox, useMultipleSelection } from "downshift";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  size as floatingUISize,
  FloatingPortal,
} from "@floating-ui/react";
import cn from "@/lib/cn";
import { useState, useId, Fragment } from "react";
import { Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { useController } from "react-hook-form";
import { matchSorter } from "match-sorter";

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

const checkDuplicate = (selectedItems, item, itemKey) => {
  return selectedItems.some((s) => s[itemKey] === item[itemKey]);
};

const MultipleSelectionDownshiftExamples = ({
  name,
  requiredMessage,
  errorMessage,
  defaultValue,
  size,
  tagRenderer,
  displayCheckMark = true,
}) => {
  const [items, setItems] = useState(fetch);

  // `selectedItems` is not needed as it is handled by `useMultipleSelection`
  // However, if you want to use it as "control prop", you can handle it with useState
  const [selectedItems, setSelectedItems] = useState(defaultValue);
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
    // addSelectedItem, // Not being used if we manage ourselves using "control prop"
    removeSelectedItem,
    setActiveIndex,
  } = useMultipleSelection({
    selectedItems, // Acts as "control prop"
    onStateChange: ({ selectedItems: newSelectedItems, type }) => {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          // Do both onChange handler and setting the `selectedItems` state
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
    closeMenu,
    selectedItem,
  } = useCombobox({
    items,
    itemToString: (item) => {
      return item ? item.nationality : "";
    },
    // defaultHighlightedIndex: 0,
    inputValue,
    // onInputValueChange: ({ inputValue }) => {
    //   // Only needed if using matchSorter!
    //
    //   // How you filter the items in the list. You can either filter by
    //   // querying the DB or use matchSorter if all items are downloaded.
    //
    //   setItems(
    //     matchSorter(fetch, inputValue, {
    //       keys: ["nationality"],
    //       baseSort: (a, b) => {
    //         return a.index < b.index ? -1 : 1;
    //       },
    //     }),
    //   );
    // },
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges;

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
    },
    selectedItem: null, // Since `useMultipleSelection` will handle the items selection
    onStateChange: ({
      inputValue: newInputValue,
      selectedItem: newSelectedItem,
      type,
    }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (newSelectedItem) {
            const hasDuplicate = checkDuplicate(
              selectedItems,
              newSelectedItem,
              "id",
            );

            let newSelectedItems = [];

            if (hasDuplicate) {
              newSelectedItems = selectedItems.filter(
                (s) => s.id !== newSelectedItem.id,
              );
            } else {
              newSelectedItems = [...selectedItems, newSelectedItem];

              // newSelectedItems = [newSelectedItem];
            }

            // If we only want single value
            // const newSelectedItems = [newSelectedItem];

            // setSelectedItems(newSelectedItems);
            // field.onChange(newSelectedItems);

            // Let outside onChange know (esp. RHF)
            handleOnChange(newSelectedItems);

            setInputValue(""); // Must also clear input value after selection
          }
          break;
        case useCombobox.stateChangeTypes.InputBlur:
          if (inputValue.trim().length > 0) {
            const newSelectedItems = [
              ...selectedItems,
              { id: Math.random(), nationality: inputValue },
            ];
            handleOnChange(newSelectedItems);
          }

          setInputValue("");

          // InputBlur must be separate in order for Backspace to work
          // setInputValue("");
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
      floatingUISize({
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
    "absolute -top-3 left-2 bg-dialog px-1 text-sm text-foreground",
    {
      "text-input-error": errorMessage,
      "-top-2.5 text-xs": size === "sm",
    },
  );
  const menuClassNames = cn(
    "absolute z-50 w-full overflow-scroll rounded-lg bg-popover shadow-md",
    {
      border: isOpen && items.length > 0,
    },
  );
  const itemClassNames = cn(
    "group p-2 data-[highlighted=true]:bg-blue-500 data-[highlighted=true]:text-white [&>*]:data-[selected=true]:font-semibold",
    "dark:data-[highlighted=true]:bg-popover-focus",
  );

  return (
    <div data-control="multiple-selection-combobox-input">
      <div
        ref={refs.setReference}
        data-invalid={!!errorMessage}
        className={cn(
          sizeVariants({ size }),
          "group relative flex w-full rounded-md border border-input text-black transition ease-in-out file:border-0 file:bg-transparent",
          "focus-within:border-input-focus focus-within:text-input-ring focus-within:ring-4 focus-within:ring-input-ring focus-within:ring-opacity-30 focus:outline-none",
          "data-[invalid=true]:border-input-error data-[invalid=true]:ring-4 data-[invalid=true]:ring-input-error data-[invalid=true]:ring-opacity-30",
        )}
      >
        <label className={labelClassNames} {...getLabelProps()}>
          Nationality
        </label>
        <div className="flex w-full flex-wrap items-center gap-1">
          {selectedItems.map((selectedItem, index) => {
            // if (typeof tagRenderer === "function") {
            //   return tagRenderer({
            //     selectedItem,
            //     index,
            //     getSelectedItemProps,
            //   });
            // }

            return (
              <Fragment key={`selected-item-${index}`}>
                {typeof tagRenderer === "function" &&
                  tagRenderer({
                    selectedItem,
                    index,
                    getSelectedItemProps,
                  })}
              </Fragment>
            );

            // return (
            //   <TagRenderer
            //     key={`selected-item-${index}`}
            //     index={index}
            //     selectedItem={selectedItem}
            //     getSelectedItemProps={getSelectedItemProps}
            //   />
            // );
            // return (
            //   <span
            //     key={`selected-item-${index}`}
            //     className="cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-sm text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
            //     {...getSelectedItemProps({ selectedItem, index })}
            //   >
            //     {selectedItem.nationality}
            //   </span>
            // );
          })}

          <div className="flex grow">
            <input
              className={cn(
                "order-2 w-full appearance-none rounded-md bg-background text-black text-foreground outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              )}
              {...getInputProps(
                getDropdownProps({
                  // preventKeyAction: isOpen, // Need to comment or else Backspace can't work
                  onKeyDown: (e) => {
                    if (e.key === "Backspace") {
                      e.nativeEvent.preventDownshiftDefault = true;
                      if (e.target.value === "") {
                        setActiveIndex(selectedItems.length - 1);
                      }
                    } else if (e.key === "Enter") {
                      const customValue = e.target.value;

                      if (customValue.trim().length > 0) {
                        const newSelectedItems = [
                          ...selectedItems,
                          { id: Math.random(), nationality: customValue },
                        ];
                        handleOnChange(newSelectedItems);
                        setInputValue("");
                      }
                    }
                  },
                }),
              )}
            />
          </div>
        </div>
      </div>

      {/*<FloatingPortal>*/}
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
                !!selectedItems.find((s) => s.id === item.id) ||
                selectedItems.includes(item);

              // Can use this "selectedItems.includes(item);" if primitive value

              // React.cloneElement(child, props)

              return (
                <li
                  // key={item.id}
                  key={`item-${index}`}
                  // data-list={true}
                  data-highlighted={highlightedIndex === index}
                  data-selected={selected}
                  className={cn(
                    "group p-2 data-[highlighted=true]:bg-blue-500 data-[highlighted=true]:text-white [&>*]:data-[selected=true]:font-semibold",
                    "dark:data-[highlighted=true]:bg-popover-focus",
                    {
                      "is-highlighted": highlightedIndex === index,
                    },
                  )}
                  {...getItemProps({ item, index })}
                >
                  <div className="flex items-center gap-2">
                    <CheckMark selected={selected} display={displayCheckMark} />
                    <div className="flex flex-col gap-0">
                      <span>{item.nationality}</span>
                      <span className="text-sm text-gray-500 group-[.is-highlighted]:text-white">
                        S1: National stats board
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
      {/*</FloatingPortal>*/}
    </div>
  );
};

const CheckMark = ({ selected, display }) => {
  if (display === false) return null;

  return selected ? (
    <Check size={16} strokeWidth={2} />
  ) : (
    <div className="invisible w-4" />
  );
};

const TagRenderer = ({ selectedItem, index, getSelectedItemProps }) => {
  return (
    <span
      key={`selected-item-${index}`}
      className="cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-sm text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
      {...getSelectedItemProps({ selectedItem, index })}
    >
      {selectedItem.nationality}
    </span>
  );
};

export default MultipleSelectionDownshiftExamples;
