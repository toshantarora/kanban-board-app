// import { useState } from "react";
// import { DragDropProvider, DragDropContext, Droppable, Draggable } from "@atlaskit/pragmatic-drag-and-drop";
import { useState } from "react";
import initialData from "../../../../utils/board.json";
import Card from "./Card";

const KanbanBoard = () => {
  const [boardData] = useState(initialData);
  console.log("====================================");
  console.log("boardData", boardData);
  console.log("====================================");
  return (
    <div className="flex flex-cols w-full gap-4">
      {boardData?.columns?.map((item, idx) => (
        <Card key={idx} data={item} />
      ))}
    </div>
  );
};

export default KanbanBoard;
