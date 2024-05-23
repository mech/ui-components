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
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { createRoot } from "react-dom/client";
import { ColumnsPlusRight } from "@phosphor-icons/react";
import { columnWidthsUpdate } from "@/components/DataGrid/actions/columnWidthsUpdate";
import { FormProvider, useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      className="grid cursor-grab grid-cols-[auto,auto,1fr] items-center gap-2 p-2 transition data-[dragging=true]:cursor-grabbing data-[dragging=true]:opacity-50"
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
      className="relative rounded-full transition data-[dragged-over=true]:bg-gray-100"
    >
      {closestEdge && <DropIndicator edge={closestEdge} />}
      {children}
    </div>
  );
};

const CustomColumnsDialog = ({ tableColumns }) => {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    setItems(tableColumns);
    // reset(
    //   tableColumns.reduce((acc, item) => {
    //     acc[item.columnName] = {
    //       visible: item.visible,
    //     };
    //     return acc;
    //   }, {}),
    // );
  }, [tableColumns]);

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
    },
    [items],
  );

  const submit = async (data) => {
    const newItems = items.map((item) => {
      const { visible } = data[item.columnName];
      return {
        ...item,
        visible,
      };
    });

    const outcome = await columnWidthsUpdate({ tableColumns: newItems });
    console.log(outcome);

    // location.reload();
    const params = new URLSearchParams(searchParams);
    // params.set("random", Math.random());
    const url = `${pathname}?${params.toString()}`;

    router.push(url);
    router.refresh();

    // startTransition(async () => {
    //   // Does not seem to work
    //   setConfigUpdating(true);
    //   const outcome = await columnWidthsUpdate({ tableColumns: newItems });
    //   setConfigUpdating(false);
    // });
  };

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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)}>
            <AlertDialogTitle>Custom columns to show or hide</AlertDialogTitle>

            <div className="mx-auto w-2/3 select-none py-4">
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
                        name={`${item.columnName}.visible`}
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
                <Button variant="ghost" pill>
                  Dismiss
                </Button>
              </AlertDialogCancel>

              <Button type="submit" variant="secondary" outline pill>
                Apply
              </Button>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomColumnsDialog;
