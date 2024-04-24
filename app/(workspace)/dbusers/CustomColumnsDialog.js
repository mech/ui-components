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
import { ColumnsPlusRight } from "@phosphor-icons/react";
import { columnWidthsUpdate } from "@/components/DataGrid/actions/columnWidthsUpdate";
import { useForm } from "react-hook-form";

// https://github.com/atlassian/pragmatic-drag-and-drop/issues/28
const DragPreview = ({ children }) => {
  return (
    <div className="rounded-full bg-gray-500 px-4 py-1.5 text-center text-sm text-white">
      {children}
    </div>
  );
};

// We actually can also combine both DroppableContainer and DraggableColumn together
const DraggableColumn = ({ children, item, index }) => {
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
            root.render(
              <DragPreview>Moving {item.columnName} ...</DragPreview>,
            );
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
      className="grid cursor-grab grid-cols-[auto,auto,1fr] items-center gap-2 p-2 data-[dragging=true]:cursor-grabbing data-[dragging=true]:opacity-50"
    >
      {children}
    </div>
  );
};

const DroppableContainer = ({ children, item, index }) => {
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
      className="relative data-[dragged-over=true]:rounded-full data-[dragged-over=true]:bg-gray-100"
    >
      {closestEdge && <DropIndicator edge={closestEdge} />}
      {children}
    </div>
  );
};

const CustomColumnsDialog = ({ tableColumns }) => {
  const [items, setItems] = useState(tableColumns);

  const { register, getValues } = useForm(tableColumns);

  const reorderItem = useCallback(
    async ({ startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: "vertical",
      });

      if (finishIndex === startIndex) return; // No movement

      const newItems = reorder({
        list: items,
        startIndex,
        finishIndex,
      });

      setItems(newItems);

      console.log(getValues());

      // const outcome = await columnWidthsUpdate({ tableColumns: newItems });
      // console.log(outcome);
    },
    [getValues, items],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const target = location.current.dropTargets[0];
        if (!target) return; // Outside any droppable container

        const sourceData = source.data;
        const targetData = target.data;

        const indexOfTarget = items.findIndex(
          // Because our getInitialData() and getData() has the same structure
          // which is: { index, item }, so the targetData need to traverse the `item` key
          (item) => item.columnName === targetData.item.columnName,
        );
        if (indexOfTarget < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        }).catch((e) => console.error(e));
      },
    });
  }, [items, reorderItem]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          prefix={<ColumnsPlusRight weight="fill" size={24} />}
        />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Custom columns to show or hide</AlertDialogTitle>

        <div className="mx-auto w-2/3 py-4">
          {items.map((item, index) => {
            return (
              <DroppableContainer
                key={item.columnName}
                item={item}
                index={index}
              >
                <DraggableColumn item={item} index={index}>
                  <GripVertical size={20} />

                  {item.columnName}
                  <Switch
                    defaultChecked={item.visible}
                    {...register(`tableColumns.${index}.visible`)}
                    size="sm"
                    className="justify-self-end"
                  />
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
