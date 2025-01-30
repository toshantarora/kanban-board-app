// import { createContext, useCallback, useContext, useState } from "react";
// import initBoardData from "../utils/board.json";



// export const BoardContext = createContext({
//   board: { name: "", columns: [] },
//   moveCard: () => {},
// });

// const BoardProvider = ({ children }) => {
//   const [board, setBoard] = useState(initBoardData);

//   const moveCard = useCallback(() => {}, [setBoard]);
//   return (
//     <BoardContext.Provider value={{ board, setBoard, moveCard }}>
//       {children}
//     </BoardContext.Provider>
//   );
// };

// const useBoard = () => useContext(BoardContext);
// export { BoardProvider, useBoard };

import { createContext, useCallback, useContext, useState } from "react";
import initBoardData from "../utils/board.json";

export const BoardContext = createContext({
  board: { name: "", columns: [] },
  setBoard: () => {},
  moveCard: () => {},
});

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(initBoardData);

  const moveCard = useCallback(({
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex,
  }) => {
    setBoard((prevBoard) => {
      const sourceColumn = prevBoard.columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = prevBoard.columns.find(
        (column) => column.id === destinationColumnId
      );

      if (!sourceColumn || !destinationColumn) return prevBoard;

      const [movedCard] = sourceColumn.cards.splice(sourceIndex, 1);
      destinationColumn.cards.splice(destinationIndex, 0, movedCard);

      return {
        ...prevBoard,
        columns: prevBoard.columns.map((column) => {
          if (column.id === sourceColumnId) return sourceColumn;
          if (column.id === destinationColumnId) return destinationColumn;
          return column;
        }),
      };
    });
  }, [setBoard]);

  return (
    <BoardContext.Provider value={{ board, setBoard, moveCard }}>
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = () => useContext(BoardContext);
export { BoardProvider, useBoard };
