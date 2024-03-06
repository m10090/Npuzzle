// Description: This file contains the main logic for solving the N puzzle.
const _stk = [];
let Grid: string[][] = [];
export function solve(grid: string[][]) {
  Grid = [...grid];
  console.log(grid);
  interface pqValues {
    cost: number;
    grid: string[][];
    g: number;
    stk: any[];
  }
  const isSolved = function (grid: string[][]) {
    const cost = getCost(grid);
    console.log(cost);
    return cost === 0;
  };
  const getCost = function (grid: string[][]) {
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
  };
  const pq: pqValues[] = [{ cost: 0, grid, g: 0, stk: [] }];
  function nextMoves(grid: string[][], g: number, stk: any[]) {
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
  while (true) {
    const { grid, g, stk } = pq.shift() as pqValues;
    nextMoves(grid, g, stk);
    pq.sort(function (a, b) {
      return a.cost - b.cost;
    });
    if (isSolved(grid)) {
      _stk.push(...stk);
      return;
    }
  }
}
export function nextMove() {
  console.log(_stk);
  const move = _stk.shift();
  const tmp = Grid[move[0][0]][move[0][1]];
  console.log(tmp)
  Grid[move[0][0]][move[0][1]] = Grid[move[1][0]][move[1][1]];
  Grid[move[1][0]][move[1][1]] = tmp;
  return [...Grid];
}
