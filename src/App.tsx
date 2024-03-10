import { useState } from "react";
import "./App.css";
import { Puzzle } from "./Puzzle";
import { getUserCost} from "./solver";

function App() {
  const [n, setN] = useState(0);
  if (!n) {
    const getValueOfN = () => {
      const input = document.getElementById("n") as HTMLInputElement;
      setN(+input.value);
    };
    const getHeuristic = () => {
      const input = document.querySelector(
        'input[name="heuristic"]:checked',
      ) as HTMLInputElement;
      getUserCost(input.id); 
    };
    return (
      <div>
        <input type="number" id="n" />
        <button
          onClick={() => {
            getValueOfN();
            getHeuristic();
          }}
        >
          Create Pazzle
        </button>
        <div>
          <input
            type="radio"
            id="manhattan"
            name="heuristic"
            value="manhattan"
            defaultChecked
          />
          <label htmlFor="manhattan" >Manhattan</label>
          <input
            type="radio"
            id="misplaced"
            name="heuristic"
            value="misplaced"
          />
          <label htmlFor="misplaced">Misplaced</label>
          <input
            type="radio"
            id="manhattan3"
            name="heuristic"
            value="manhattan3"
          />
          <label htmlFor="manhattan3">Manhattan / 3</label>
        </div>
      </div>
    );
  }
  return <GridInput n={n} />;
}

export default App;
const GridInput = ({ n }) => {
  const [grid, setGrid] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => "")),
  );
  const [Flag, setFlag] = useState(false);

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string,
  ) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  };
  if (Flag) {
    return <Puzzle _grid={grid} />;
  }
  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <input
              key={colIndex}
              type="text"
              value={col}
              onChange={(e) => {
                handleInputChange(rowIndex, colIndex, e.target.value);
              }}
            />
          ))}
        </div>
      ))}
      <button onClick={() => setFlag(true)}>Submit</button>
    </div>
  );
};
