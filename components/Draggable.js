"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";

// https://github.com/atlassian/pragmatic-drag-and-drop/issues/28
const DragPreview = ({ children }) => {
  return (
    <div className="rounded-full bg-gray-500 px-4 py-1.5 text-center text-sm text-white">
      {children}
    </div>
  );
};

const Droppable = ({ children, item, index }) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);

  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
      element: el,
      onDragEnter: (args) => {
        setIsDraggedOver(true);
        setClosestEdge(extractClosestEdge(args.self.data));
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      },
      onDrop: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      },
      getData: ({ input, element }) => {
        const data = {
          index,
          item,
        };

        return attachClosestEdge(data, {
          input,
          element,
          allowedEdges: ["top", "bottom"],
        });
      },
    });
  }, [item, index]);

  return (
    <div
      ref={ref}
      data-dragged-over={isDraggedOver}
      className="relative rounded-full transition data-[dragged-over=true]:bg-gray-100"
    >
      {closestEdge && <DropIndicator edge={closestEdge} />}
      {children}
    </div>
  );
};

const Draggable = ({ children, item, index }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
      element: el,
      getInitialData: () => ({ index, item }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render: ({ container }) => {
            const root = createRoot(container);
            root.render(<DragPreview>Moving {item.name} ...</DragPreview>);
            return () => root.unmount();
          },
        });
      },
      onDragStart: (e) => {
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [item, index]);

  return (
    <div
      ref={ref}
      data-dragging={dragging}
      className="grid cursor-grab grid-cols-[auto,auto,1fr] items-center gap-2 p-2 transition data-[dragging=true]:cursor-grabbing data-[dragging=true]:opacity-50"
    >
      {children}
    </div>
  );
};

export { Droppable, Draggable };
