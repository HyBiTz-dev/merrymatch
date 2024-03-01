import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, children, ...props }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}
