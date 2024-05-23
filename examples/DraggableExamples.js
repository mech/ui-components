import { Draggable, Droppable } from "@/components/Draggable";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useCallback, useEffect, useState } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";

const DraggableExamples = ({ children, onDrop, ...props }) => {
  const [items, setItems] = useState(props.items);

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

      onDrop && onDrop(newItems);
    },
    [items, onDrop],
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
          (item) => item.name === targetData.item.name,
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
    <div className="select-none">
      {items.map((item, index) => {
        return (
          <Droppable key={item.id} item={item} index={index}>
            <Draggable item={item} index={index}>
              {children({ item })}
            </Draggable>
          </Droppable>
        );
      })}
    </div>
  );
};

export default DraggableExamples;
