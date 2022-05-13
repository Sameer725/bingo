import { DataType, DEFAULT_GRID_SIZE, spokenItems } from "../const";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const generateData = (gridLength: number = DEFAULT_GRID_SIZE) => {
  const items = shuffleArray(spokenItems).slice(0, gridLength * gridLength);
  let data: DataType[][] = [];
  const midIndex = Math.floor(gridLength / 2);

  for (let i = 0; i < gridLength; i++) {
    const row = data[i] ?? [];

    for (let j = 0; j < gridLength; j++) {
      const column = row[j] ?? {};
      column.id = `${i}${j}`;
      column.title = items[i * gridLength + j];
      column.selected = i === midIndex && j === midIndex;
      column.free = i === midIndex && j === midIndex;
      row[j] = column;
    }

    data.push(row);
  }

  return data;
};

/**
 * To Check for bingo
 *   range.find(row => range.every(column => selected[row *gridLength + column])) ||
     range.find(column => range.every(row => selected[row *gridLength + column])) ||
     range.every(index => selected[index *gridLength + index]) ||
     range.every(index => selected[index *gridLength + (gridLength - 1 ) - index])
 */

const rows = new Set<number>();
const columns = new Set<number>();
const diagonals = new Set<number>();

export const calculateBingo = (state: DataType[][]) => {
  let isFirstDiagonalBingo = true;
  let isSecondDiagonalBingo = true;

  for (let row = 0; row < state.length; row++) {
    const isRowBingo = state.every((r, index) => state[row][index].selected);
    const isColumnBingo = state.every((r, index) => state[index][row].selected);
    isFirstDiagonalBingo = isFirstDiagonalBingo && state[row][row].selected;
    isSecondDiagonalBingo =
      isSecondDiagonalBingo && state[state.length - 1 - row][row].selected;

    if (isRowBingo) {
      rows.add(row);
    }

    if (!isRowBingo) {
      rows.delete(row);
    }

    if (isColumnBingo) {
      columns.add(row);
    }

    if (!isColumnBingo) {
      columns.delete(row);
    }
  }

  if (isFirstDiagonalBingo) {
    diagonals.add(0);
  }

  if (!isFirstDiagonalBingo) {
    diagonals.delete(0);
  }
  if (isSecondDiagonalBingo) {
    diagonals.add(1);
  }

  if (!isSecondDiagonalBingo) {
    diagonals.delete(1);
  }

  return {
    rows: Array.from(rows),
    columns: Array.from(columns),
    diagonals: Array.from(diagonals),
  };
};

export const updateGridSize = (gridLength: number = DEFAULT_GRID_SIZE) => {
  document.documentElement.style.setProperty(
    "--grid-size",
    gridLength.toString()
  );
};
