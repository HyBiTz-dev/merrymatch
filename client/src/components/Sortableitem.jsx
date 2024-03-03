import React from "react";
import { useSortable } from "@dnd-kit/sortable";

export function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <tr
      className="bg-white border-b border-gray-200 text-body2 text-black"
      ref={setNodeRef}
      style={style}
    >
      <td
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      >
        <img src="/images/drag.svg" />
      </td>
      {children}
    </tr>
  );
}
