// Description: This file contains the main logic for solving the N puzzle.
const _stk = [];
let Grid: string[][] = [];
let mx = 0;
export let userCost: 'manhattan' | 'manhattan3' | 'misplaced';
export function solve(grid: string[][]) {
  Grid = [...grid];
  interface pqValues {
    cost: number;
    grid: string[][];
    g: number;
    stk: [[number, number], [number, number]][];
  }
  const getCost = costFunctions[userCost];
  const isSolved = function (grid: string[][]) {
    const cost = getCost(grid);
    return cost === 0;
  };
  const pq: pqValues[] = [{ cost: 0, grid, g: 0, stk: [] }];
  function nextMoves(
    grid: string[][],
    g: number,
    stk: [[number, number], [number, number]][],
  ) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === "") {
          if (i > 0) {
            const newGrid = grid.map((row) => row.slice());
            [newGrid[i][j], newGrid[i - 1][j]] = [
              newGrid[i - 1][j],
              newGrid[i][j],
            ];
            stk.push([
              [i, j],
              [i - 1, j],
            ]);
            pq.push({
              grid: newGrid,
              cost: getCost(newGrid) + g,
              g: g + 1,
              stk: [...stk],
            });
            stk.pop();
          }
          if (i < grid.length - 1) {
            const newGrid = grid.map((row) => row.slice());
            [newGrid[i][j], newGrid[i + 1][j]] = [
              newGrid[i + 1][j],
              newGrid[i][j],
            ];
            stk.push([
              [i, j],
              [i + 1, j],
            ]);
            pq.push({
              grid: newGrid,
              cost: getCost(newGrid) + g,
              g: g + 1,
              stk: [...stk],
            });
            stk.pop();
          }
          if (j > 0) {
            const newGrid = grid.map((row) => row.slice());
            [newGrid[i][j], newGrid[i][j - 1]] = [
              newGrid[i][j - 1],
              newGrid[i][j],
            ];
            stk.push([
              [i, j],
              [i, j - 1],
            ]);
            pq.push({
              grid: newGrid,
              cost: getCost(newGrid) + g,
              g: g + 1,
              stk: [...stk],
            });
            stk.pop();
          }
          if (j < grid.length - 1) {
            const newGrid = grid.map((row) => row.slice());
            [newGrid[i][j], newGrid[i][j + 1]] = [
              newGrid[i][j + 1],
              newGrid[i][j],
            ];
            stk.push([
              [i, j],
              [i, j + 1],
            ]);
            pq.push({
              grid: newGrid,
              cost: getCost(newGrid) + g,
              g: g + 1,
              stk: [...stk],
            });
            stk.pop();
          }
        }
      }
    }
  }
  while (pq.length) {
    mx = Math.max(pq.length, mx);
    const { grid, g, stk } = pq.shift() as pqValues;
    nextMoves(grid, g, stk);
    pq.sort(function (a, b) {
      return a.cost - b.cost;
    });
    if (isSolved(grid)) {
      _stk.push(...stk);
      break;
    }
  }
  console.log(mx);
}
export function nextMove() {
  const move = _stk.shift();
  const tmp = Grid[move[0][0]][move[0][1]];
  Grid[move[0][0]][move[0][1]] = Grid[move[1][0]][move[1][1]];
  Grid[move[1][0]][move[1][1]] = tmp;
  return [...Grid];
}
const costFunctions = {
  manhattan3: function (grid: string[][]) {
    let cost = 0;
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          const value = parseInt(cell) - 1;
          const distant =
            Math.abs(Math.floor(value / grid.length) - i) +
            Math.abs((value % grid.length) - j);
          cost += distant;
        }
      });
    });
    // don't work 
    return cost/3;
  },
  manhattan: function (grid: string[][]) {
    let cost = 0;
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          const value = parseInt(cell) - 1;
          const distant =
            Math.abs(Math.floor(value / grid.length) - i) +
            Math.abs((value % grid.length) - j);
          cost += distant;
        }
      });
    });
    return cost;
  },
  misplaced: function (grid: string[][]) {
    let cost = 0;
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          const value = parseInt(cell);
          if (value !== i * grid.length + j + 1) {
            cost++;
          }
        }
      });
    });
    return cost;
  },
} as const;
export function getUserCost(method:string) {
  // @ts-expect-error userCost is a string
  userCost = method;
}
