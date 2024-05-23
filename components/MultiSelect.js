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
import { Fragment, useState, Children, cloneElement } from "react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { useController } from "react-hook-form";
import RaceBy from "@/components/RaceBy";
import { useMergeRefs } from "@floating-ui/react";

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

function MultiSelect({
  multiple = true,
  fetching = false,
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
  onInputValueChange,
  name,
  rules,
  onChange,
  children,
  menuWrapperClassName,
}) {
  // `selectedItems` is not needed as it is handled by `useMultipleSelection`
  // However, if you want to use it as a "control prop", you can handle it with useState
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, _setInputValue] = useState("");

  // In case the data only has one key like [{nationality: "Singaporean"}, {nationality: "Malaysian"}]
  itemKey = itemKey || itemName;

  const tagChild = Children.toArray(children).find((child) => {
    return child.type.name === "Tag";
  }) || <DefaultTag itemName={itemName} />;
  const itemChild = Children.toArray(children).find((child) => {
    return child.type.name === "Item";
  }) || <DefaultItem itemName={itemName} />;
  const fetchingChild = Children.toArray(children).find((child) => {
    return child.type.name === "Fetching";
  }) || <DefaultFetching />;
  const headerChild =
    Children.toArray(children).find((child) => {
      return child.type.name === "Header";
    }) || null;

  itemToString = itemToString || ((item) => (item ? item[itemName] : ""));

  const { field } = useController({ name, rules });

  const handleOnChange = (selectedItems) => {
    setSelectedItems(selectedItems);

    onChange ? onChange(selectedItems) : field.onChange(selectedItems);
  };

  const setInputValue = (value) => {
    _setInputValue(value);
    onInputValueChange && onInputValueChange(value);
  };

  const addCustomValue = (value) => {
    if (value.trim().length > 0) {
      let newSelectedItems = [];

      if (multiple) {
        newSelectedItems = [
          ...selectedItems,
          { id: Math.random(), [`${itemName}`]: value },
        ];
      } else {
        newSelectedItems = [{ id: Math.random(), [`${itemName}`]: value }];
      }

      handleOnChange(newSelectedItems);
    }
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
    closeMenu,
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
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...changes,
            isOpen: true, // We always want InputClick to show menu (no hiding)
          };
        case useCombobox.stateChangeTypes.InputBlur:
          // iOS Safari will invoke this after itemClick, so we need to closeMenu
          // at input onBlur

          return {
            ...changes,
            isOpen: state.isOpen,
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

            // Let outside onChange know (esp. RHF)
            handleOnChange(newSelectedItems);

            setInputValue(""); // Must also clear input value after selection
          }
          break;
        case useCombobox.stateChangeTypes.InputBlur:
          // InputBlur must be separate in order for Backspace to work
          addCustomValue(inputValue); // Don't use `newInputValue` as it will be undefined!

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

  const labelClassNames = cn(
    "absolute -top-3 left-2 bg-dialog px-1 text-sm text-foreground",
    {
      "text-input-error": errorMessage,
      "-top-2.5 text-xs": size === "sm",
    },
  );

  const menuClassNames = cn(
    "z-50 w-full overflow-scroll rounded-lg bg-popover shadow-md",
    {
      border:
        (isOpen && items.length > 0) || (isOpen && (fetching || headerChild)),
    },
  );

  return (
    <div data-control="multiple-selection-combobox-input">
      <div
        ref={refs.setReference}
        data-disabled={disabled}
        data-invalid={!!errorMessage}
        className={cn(
          sizeVariants({ size }),
          "group relative flex w-full rounded-md border border-input text-black transition ease-in-out file:border-0 file:bg-transparent",
          "focus-within:border-input-focus focus-within:text-input-ring focus-within:ring-4 focus-within:ring-input-ring focus-within:ring-opacity-30 focus:outline-none",
          "data-[invalid=true]:border-input-error data-[invalid=true]:ring-4 data-[invalid=true]:ring-input-error data-[invalid=true]:ring-opacity-30",
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
        )}
      >
        <label className={labelClassNames} {...getLabelProps()}>
          {label}
        </label>
        <div className="flex w-full flex-wrap items-center gap-1 text-foreground">
          {selectedItems.map((selectedItem, index) => {
            // We clone the MultiSelect.Tag component from user space and
            // pass in the necessary props to make it work. Essentially we are
            // asking the user to provide us with the <Tag> first, then we clone
            // and render it for them later here.
            const tagChildClone = cloneElement(tagChild, {
              index,
              selectedItem,
              getSelectedItemProps,
            });

            return (
              <Fragment key={`selected-item-${index}`}>
                {tagChildClone}
              </Fragment>
            );
          })}

          <div className="flex grow">
            <input
              disabled={disabled}
              className={cn(
                "order-2 w-full appearance-none rounded-md bg-background text-black text-foreground outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              )}
              placeholder={selectedItems.length === 0 ? placeholder : ""}
              {...getInputProps(
                getDropdownProps({
                  onChange: (e) => {
                    // This is needed to prevent input cursor from jumping to the end when typing in the middle
                    setInputValue(e.target.value);
                  },
                  onBlur: (e) => {
                    // Necessary to make iOS Safari behave when clicking on item
                    addCustomValue(e.target.value);
                    setInputValue("");
                    closeMenu();
                  },
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

                      addCustomValue(customValue);
                      setInputValue("");
                    }
                  },
                }),
              )}
            />
          </div>
        </div>
      </div>

      <FloatingPortal>
        <div
          style={floatingStyles}
          className={menuClassNames}
          {...getMenuProps(
            {
              ref: useMergeRefs([refs.setFloating]),
            },
            { suppressRefError: true },
          )}
        >
          {isOpen && headerChild}
          {fetching && fetchingChild}
          {isOpen && (
            <div
              className={items.length > 0 ? menuWrapperClassName : undefined}
            >
              {items.map((item, index) => {
                // Typically we want to compare using itemKey. However, if using
                // primitive value, we can use this "selectedItems.includes(item);"
                const selected = itemKey
                  ? !!selectedItems.find((s) => s[itemKey] === item[itemKey])
                  : selectedItems.includes(item);

                const highlighted = highlightedIndex === index;

                const itemChildClone = cloneElement(itemChild, {
                  index,
                  item,
                  selected,
                  highlighted,
                });

                // [&>*] - https://github.com/tailwindlabs/tailwindcss/discussions/10301
                return (
                  <div
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
                      itemChild.props.className,
                    )}
                    {...getItemProps({ item, index })}
                  >
                    <div className="flex items-center gap-2">
                      <CheckMark
                        selected={selected}
                        displayCheckMark={displayCheckMark}
                      />
                      {itemChildClone}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FloatingPortal>
    </div>
  );
}

const Tag = ({
  children,
  className,
  index,
  selectedItem,
  getSelectedItemProps,
}) => {
  return (
    <div
      key={`selected-item-${index}`}
      className={cn(
        "cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-xs text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400",
        className,
      )}
      {...getSelectedItemProps({ selectedItem, index })}
    >
      {children({ index, selectedItem })}
    </div>
  );
};

const DefaultTag = ({ itemName, ...props }) => (
  <Tag {...props}>{({ selectedItem }) => selectedItem[itemName]}</Tag>
);

const Item = ({ children, index, item, selected, highlighted }) => {
  return children({ index, item, selected, highlighted });
};

const DefaultItem = ({ itemName, ...props }) => (
  <Item {...props}>{({ item }) => item[itemName]}</Item>
);

const Fetching = ({ children }) => {
  return children;
};

const DefaultFetching = () => {
  return (
    <li className="flex items-center justify-center gap-4 p-4">
      <RaceBy />
    </li>
  );
};

const Header = ({ children }) => {
  return children;
};

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

MultiSelect.Tag = Tag;
MultiSelect.Item = Item;
MultiSelect.Fetching = Fetching;
MultiSelect.Header = Header;

export { MultiSelect };
