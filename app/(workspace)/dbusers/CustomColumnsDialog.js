"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import Button from "@/components/Button";
import { Switch } from "@/components/Switch";
import { GripVertical } from "lucide-react";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// https://github.com/atlassian/pragmatic-drag-and-drop/issues/28
const DragPreview = ({ children }) => {
  return (
    <div className="rounded-full bg-gray-500 px-4 py-1.5 text-center text-sm text-white">
      {children}
    </div>
  );
};

// We actually can also combine both DroppableContainer and DraggableColumn together
const DraggableColumn = ({ children, columnName, index }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
      element: el,
      getInitialData: () => ({ index, columnName }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render: ({ container }) => {
            const root = createRoot(container);
            root.render(<DragPreview>Moving {columnName} ...</DragPreview>);
            return () => root.unmount();
          },
        });
      },
      onDragStart: (e) => {
        setDragging(true);
      },
      onDrop: () => setDragging(false),
    });
  }, [columnName, index]);

  return (
    <div
      ref={ref}
      data-dragging={dragging}
      className="grid cursor-grab grid-cols-[auto,auto,1fr] items-center gap-2 p-2 data-[dragging=true]:cursor-grabbing data-[dragging=true]:opacity-50"
    >
      <GripVertical size={20} />
      {children}
      <Switch checked size="sm" className="justify-self-end" />
    </div>
  );
};

const DroppableContainer = ({ children, columnName, index }) => {
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
          columnName,
        };

        return attachClosestEdge(data, {
          input,
          element,
          allowedEdges: ["top", "bottom"],
        });
      },
    });
  }, [columnName, index]);

  return (
    <div
      ref={ref}
      data-dragged-over={isDraggedOver}
      className="relative data-[dragged-over=true]:rounded-full data-[dragged-over=true]:bg-gray-100"
    >
      {closestEdge && <DropIndicator edge={closestEdge} />}
      {children}
    </div>
  );
};

const outsideItems = [
  { columnName: "Name" },
  { columnName: "Email" },
  { columnName: "Created At" },
];

const CustomColumnsDialog = () => {
  const [items, setItems] = useState(outsideItems);

  const reorderItem = useCallback(
    ({ startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: "vertical",
      });

      if (finishIndex === startIndex) return; // No movement

      setItems((prevItems) => {
        return reorder({
          list: prevItems,
          startIndex,
          finishIndex,
        });
      });
    },
    [],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const target = location.current.dropTargets[0];
        if (!target) return; // Outside any droppable container

        const sourceData = source.data;
        const targetData = target.data;

        const indexOfTarget = items.findIndex(
          (item) => item.columnName === targetData.columnName,
        );
        if (indexOfTarget < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [items, reorderItem]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="secondary" outline>
          Custom Columns
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Custom columns to show or hide</AlertDialogTitle>

        <div className="mx-auto w-2/3 py-4">
          {items.map((item, index) => {
            return (
              <DroppableContainer
                key={item.columnName}
                columnName={item.columnName}
                index={index}
              >
                <DraggableColumn columnName={item.columnName} index={index}>
                  {item.columnName}
                </DraggableColumn>
              </DroppableContainer>
            );
          })}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="secondary" outline pill>
              Close
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomColumnsDialog;
