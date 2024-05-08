"use client";

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
import { Fragment, useState } from "react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";

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

export default function MultiSelect({
  multiple = true,
  items = [],
  itemToString,
  itemKey,
  itemName,
  label,
  placeholder,
  errorMessage,
  size,
  disabled = false,
  displayCheckMark = true,
  tagRenderer,
  itemRenderer,
}) {
  // `selectedItems` is not needed as it is handled by `useMultipleSelection`
  // However, if you want to use it as a "control prop", you can handle it with useState
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  itemToString = itemToString || ((item) => (item ? item[itemName] : ""));
  itemRenderer = itemRenderer || (({ item }) => item[itemName]);

  const handleOnChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    // field.onChange(selectedItems);
  };

  // -----
  // useMultipleSelection
  // -----
  const {
    getSelectedItemProps,
    getDropdownProps,
    // addSelectedItem, // Not being used if we manage ourselves using "control prop"
    removeSelectedItem,
    setActiveIndex, // For backspace deletion
  } = useMultipleSelection({
    selectedItems, // Acts as "control prop", taken from useState
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

  // -----
  // useCombobox
  // -----
  const {
    isOpen,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem, // Not useful here since we give it `null`
  } = useCombobox({
    selectedItem: null, // Since `useMultipleSelection` will handle the items selection
    items,
    itemToString,
    // defaultHighlightedIndex: 0, // Best to not pre-select to allow for custom value
    inputValue,
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
              itemKey,
            );

            let newSelectedItems = [];

            if (hasDuplicate) {
              newSelectedItems = selectedItems.filter(
                (s) => s[itemKey] !== newSelectedItem[itemKey],
              );
            } else {
              if (multiple) {
                newSelectedItems = [...selectedItems, newSelectedItem];
              } else {
                newSelectedItems = [newSelectedItem];
              }
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
          // InputBlur must be separate in order for Backspace to work
          if (inputValue.trim().length > 0) {
            let newSelectedItems = [];

            if (multiple) {
              newSelectedItems = [
                ...selectedItems,
                { id: Math.random(), [`${itemName}`]: inputValue },
              ];
            } else {
              newSelectedItems = [
                { id: Math.random(), [`${itemName}`]: inputValue },
              ];
            }

            handleOnChange(newSelectedItems);
          }

          setInputValue("");
          break;
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  // -----
  // useFloating
  //
  // Need to use suppressRefError: true due to FloatingPortal
  // https://github.com/downshift-js/downshift/issues/1272
  // -----
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

  const labelClassNames = cn("absolute -top-3 left-2 bg-dialog px-1 text-sm", {
    "text-input-error": errorMessage,
    "-top-2.5 text-xs": size === "sm",
  });

  const menuClassNames = cn(
    "absolute z-50 w-full overflow-scroll rounded-lg bg-popover shadow-md",
    {
      border: isOpen && items.length > 0,
    },
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
          {label}
        </label>
        <div className="flex w-full flex-wrap items-center gap-1 text-foreground">
          {selectedItems.map((selectedItem, index) => {
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
          })}

          <div className="flex grow">
            <input
              className={cn(
                "order-2 w-full appearance-none rounded-md bg-background text-black text-foreground outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              )}
              placeholder={placeholder}
              {...getInputProps(
                getDropdownProps({
                  // preventKeyAction: isOpen, // Need to comment or else Backspace can't work
                  onKeyDown: (e) => {
                    if (e.key === "Backspace") {
                      e.nativeEvent.preventDownshiftDefault = true;
                      if (e.target.value === "") {
                        if (multiple) {
                          setActiveIndex(selectedItems.length - 1);
                        } else {
                          handleOnChange([]);
                        }
                      }
                    } else if (e.key === "Enter") {
                      const customValue = e.target.value;

                      if (customValue.trim().length > 0) {
                        let newSelectedItems = [];

                        if (multiple) {
                          newSelectedItems = [
                            ...selectedItems,
                            { id: Math.random(), [`${itemName}`]: inputValue },
                          ];
                        } else {
                          newSelectedItems = [
                            { id: Math.random(), [`${itemName}`]: inputValue },
                          ];

                          console.log(newSelectedItems);
                        }

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
                // Typically we want to compare using itemKey. However, if using
                // primitive value, we can use this "selectedItems.includes(item);"
                const selected = itemKey
                  ? !!selectedItems.find((s) => s[itemKey] === item[itemKey])
                  : selectedItems.includes(item);

                const highlighted = highlightedIndex === index;

                // React.cloneElement(child, props)

                // [&>*] - https://github.com/tailwindlabs/tailwindcss/discussions/10301
                return (
                  <li
                    key={`item-${index}`}
                    data-highlighted={highlighted}
                    data-selected={selected}
                    className={cn(
                      "group p-2 data-[highlighted=true]:bg-blue-500 data-[highlighted=true]:text-white [&>*]:data-[selected=true]:font-semibold",
                      "dark:data-[highlighted=true]:bg-popover-focus",
                      {
                        "is-highlighted": highlighted,
                        "is-selected": selected,
                      },
                    )}
                    {...getItemProps({ item, index })}
                  >
                    <div className="flex items-center gap-2">
                      <CheckMark
                        selected={selected}
                        displayCheckMark={displayCheckMark}
                      />
                      {itemRenderer({ index, item, selected, highlighted })}
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
}

const checkDuplicate = (selectedItems, item, itemKey) => {
  return selectedItems.some((s) => s[itemKey] === item[itemKey]);
};

const CheckMark = ({ selected, displayCheckMark }) => {
  if (!displayCheckMark) return null;

  return selected ? (
    <Check size={16} strokeWidth={2} />
  ) : (
    <div className="invisible w-4" />
  );
};
