import { useState } from "react";
import "./App.css";
import { Puzzle } from "./Puzzle";

function App() {
  const [n, setN] = useState(0);
  const [pazzle, pazzleSet] = useState([]);
  if (!n) {
    const getValueOfN = () => {
      const input = document.getElementById("n") as HTMLInputElement;
      setN(+input.value);
    }
    return (
      <div>
        <input type="number" id="n" />
        <button onClick ={getValueOfN}
        >
          Create Pazzle
        </button>
      </div>
    );
  }
  return <GridInput n={n} />;

}

export default App;
const GridInput = ({n}) => {
  const [grid, setGrid] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => "")),
  );
  const [Flag, setFlag] = useState(false);

  const handleInputChange = (rowIndex, colIndex, value) => {
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
              onChange={(e) =>
                { handleInputChange(rowIndex, colIndex, e.target.value) }
              }
            />
          ))}
        </div>
      ))}
      <button onClick={() => setFlag(true)}>Submit</button>
    </div>
  );
};
