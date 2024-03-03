import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}
