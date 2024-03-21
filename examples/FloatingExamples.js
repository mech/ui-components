import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import Button from "@/components/Button";
import { useState } from "react";
import Input from "@/components/Input";

const FloatingExamples = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
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

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <div>
      <Input
        ref={refs.setReference}
        {...getReferenceProps()}
        label="Nationality"
      />
      {isOpen && (
        <FloatingPortal>
          <ul
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 max-h-96 w-full overflow-y-scroll rounded-md border bg-white p-2 shadow-md"
            {...getFloatingProps()}
          >
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>
              <button onClick={() => console.log("4")}>Item four</button>
            </li>
            <li>
              <button onClick={() => console.log("5")}>Item five</button>
            </li>
            <li>
              <button onClick={() => console.log("4")}>Item four</button>
            </li>
            <li>
              <button onClick={() => console.log("5")}>Item five</button>
            </li>
            <li>
              <button onClick={() => console.log("4")}>Item four</button>
            </li>
            <li>
              <button onClick={() => console.log("5")}>Item five</button>
            </li>
          </ul>
        </FloatingPortal>
      )}
    </div>
  );
};

export default FloatingExamples;
