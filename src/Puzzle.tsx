import { solve, nextMove } from "./solver.ts";
import  { useState } from "react";
export function Puzzle({ _grid }) {
  const [grid, setGrid] = useState([]);
  if (!grid.length) {
    solve(_grid);
    setGrid(_grid);
  }
  return (
    <div className="center">
      {grid.map((row: string[], rowIndex: number) => (
        <div
          key={rowIndex}
          className="row"
          style={{
            boxSizing: "border-box",
            height: "70%",
            width: "70%",
          }}
        >
          {row.map((col: string, colIndex: number) => (
            <div
              key={colIndex}
              className="col"
              style={{
                boxSizing: "border-box",
                display: "block",
                backgroundColor: "White",
                color: "Black",
                height: "70px",
                width: "70px",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => {
          const next = nextMove();
          setGrid(next);
        }}
      >
        next Move
      </button>
    </div>
  );
}
