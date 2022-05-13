import "./App.css";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Card, Tile, Wrapper } from "./components";
import { DataType, DEFAULT_GRID_SIZE } from "./const";
import { calculateBingo, generateData, updateGridSize } from "./utils";

const gridSize = DEFAULT_GRID_SIZE;

const App = () => {
  const [bingoData, setBingoData] = useState<DataType[][]>(() =>
    generateData(gridSize)
  );
  const prevRows = useRef<Number[] | undefined>(undefined);
  const prevColumns = useRef<Number[] | undefined>(undefined);
  const prevDiagonals = useRef<Number[] | undefined>(undefined);

  useLayoutEffect(() => {
    updateGridSize(gridSize);
  }, []);

  const { rows, columns, diagonals } = useMemo(
    () => calculateBingo(bingoData),
    [bingoData]
  );

  useEffect(() => {
    prevColumns.current = columns;
    prevRows.current = rows;
    prevDiagonals.current = diagonals;
  }, [rows, columns, diagonals]);

  const onToggle = useCallback(
    (rowIndex: number, columnIndex: number) =>
      setBingoData((state) => {
        return state.map((row, index) => {
          if (index === rowIndex) {
            return row.map((column, subIndex) => {
              if (subIndex === columnIndex) {
                return { ...column, selected: !column.selected };
              }

              return column;
            });
          }

          return row;
        });
      }),
    []
  );

  const getWobble = (rowIndex: number, columnIndex: number) => {
    let wobble = false;
    const currentColumn = columns[columns.length - 1];
    const currentRow = rows[rows.length - 1];
    const currentDiagonal = diagonals[diagonals.length - 1];

    if (
      !prevColumns.current?.includes(columnIndex) &&
      currentColumn === columnIndex
    ) {
      wobble = true;
    }

    if (!prevRows.current?.includes(rowIndex) && currentRow === rowIndex) {
      wobble = true;
    }

    if (
      !prevDiagonals.current?.includes(currentDiagonal) &&
      columnIndex === rowIndex &&
      currentDiagonal === 0
    ) {
      wobble = true;
    }

    if (
      !prevDiagonals.current?.includes(currentDiagonal) &&
      columnIndex === gridSize - 1 - rowIndex &&
      currentDiagonal === 1
    ) {
      wobble = true;
    }

    return wobble;
  };

  return (
    <main className="app">
      <Card title="Bingo">
        <Wrapper>
          {bingoData.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
              const isWobble = getWobble(rowIndex, columnIndex);

              return (
                <Tile
                  columnIndex={columnIndex}
                  isCalled={column.selected}
                  isFree={column.free}
                  isWobble={isWobble}
                  key={column.id}
                  onToggle={onToggle}
                  rowIndex={rowIndex}
                  title={column.title}
                />
              );
            });
          })}
        </Wrapper>
      </Card>
    </main>
  );
};

export default App;
