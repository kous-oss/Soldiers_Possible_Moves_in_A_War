import { useState } from "react";
import "./styles.css";

export default function App() {
  const [selectedSolider, setSelectedSoldier] = useState("");

  const [selectedCell, setSelectedCell] = useState({
    row: "",
    column: ""
  });

  const getImage = () => {
    let res = "";
    switch (selectedSolider) {
      case "BISHOP":
        res = "../public/Images/Bishop.png";
        break;
      case "ROOK":
        res = "../public/Images/Rook.png";
        break;
      case "KING":
        res = "../public/Images/King.png";
        break;
      case "KNIGHT":
        res = "../public/Images/Knight.png";
        break;
      case "QUEEN":
        res = "../public/Images/Queen.png";
        break;
      case "SOLDIER":
        res = "../public/Images/Soldier.png";
        break;
      default:
        break;
    }
    return res;
  };

  const [result, setResult] = useState([]);

  let chessArr = [...Array(8)].map((e) => [0, 0, 0, 0, 0, 0, 0, 0]);

  //index -for row and ix - for column
  const getDefaultColor = (index, idx) => {
    let color;
    if (index % 2 === 0 && idx % 2 === 0) {
      color = "black";
    }
    if (index % 2 === 1 && idx % 2 === 1) {
      color = "black";
    }
    return color;
  };

  const getColor = (index, idx) => {
    let color;
    if (selectedCell.row === "" && selectedCell.column === "") {
      // if(index%2 === 0 && idx % 2=== 0){
      //   color = 'black';
      // }
      // if(index%2 ===1 && idx%2 ===1){
      //   color= 'black';
      // }
      color = getDefaultColor(index, idx);
    } else {
      // console.log(result)
      if (selectedCell.row === index && selectedCell.column === idx) {
        color = "blue";
      }
      if (result.length > 0) {
        result.forEach((res) => {
          if (res[0] === index && res[1] === idx) {
            console.log("hi");
            color = "orange";
          }
        });
      }
      // if (!color && index % 2 === 0 && idx % 2 === 0) {
      //   color = 'black';
      // }
      // if (!color && index % 2 === 1 && idx % 2 === 1) {
      //   color = 'black';
      // }
      if (!color) {
        color = getDefaultColor(index, idx);
      }
    }
    return color;
  };

  const handleClick = (e, index, idx) => {
    setSelectedCell({
      row: index,
      column: idx
    });
    let sIndex = index;
    let sIdx = idx;
    let res = [];
    if (selectedSolider === "Bishop" || selectedSolider === "Queen") {
      // Top-left
      while (sIdx > 0 && sIndex > 0) {
        res.push([sIndex - 1, sIdx - 1]);
        sIndex--;
        sIdx--;
      }
      sIndex = index;
      sIdx = idx;
      // Top-right
      while (sIndex > 0 && 7 > sIdx) {
        res.push([sIndex - 1, sIdx + 1]);
        sIndex--;
        sIdx++;
      }
      sIndex = index;
      sIdx = idx;
      // Bottom-left
      while (7 > sIndex && sIdx > 0) {
        res.push([sIndex + 1, sIdx - 1]);
        sIndex++;
        sIdx--;
      }
      // Bottom-Right
      sIndex = index;
      sIdx = idx;
      // Bottom-left
      while (7 > sIndex && 7 > sIdx) {
        res.push([sIndex + 1, sIdx + 1]);
        sIndex++;
        sIdx++;
      }
    }
    if (selectedSolider === "Rook" || selectedSolider === "Queen") {
      //left
      sIndex = index;
      sIdx = idx;
      while (sIdx >= 0) {
        res.push([sIndex, sIdx - 1]);
        sIdx--;
      }
      sIndex = index;
      sIdx = idx;
      //right
      while (8 > sIdx) {
        res.push([sIndex, sIdx + 1]);
        sIdx++;
      }
      sIndex = index;
      sIdx = idx;
      //top
      while (sIndex >= 0) {
        res.push([sIndex - 1, sIdx]);
        sIndex--;
      }
      sIndex = index;
      sIdx = idx;
      while (8 > sIndex) {
        res.push([sIndex + 1, sIdx]);
        sIndex++;
      }
    }
    if (selectedSolider === "Knight") {
      //top-left
      if (sIndex - 1 >= 0 && sIdx - 1 >= 0) {
        if (sIndex - 2 >= 0) {
          res.push([sIndex - 2, sIdx - 1]);
        }
        if (sIdx - 1 >= 0) {
          res.push([sIndex - 1, sIdx - 2]);
        }
      }
      sIndex = index;
      sIdx = idx;
      //top-right
      if (sIndex - 1 >= 0 && sIdx < 8) {
        if (sIndex - 2 >= 0) {
          res.push([sIndex - 2, sIdx + 1]);
        }
        if (sIdx + 1 < 8) {
          res.push([sIndex - 1, sIdx + 2]);
        }
      }

      sIndex = index;
      sIdx = idx;
      //bottom-left
      if (sIndex + 1 < 8 && sIdx - 1 > 0) {
        if (sIndex + 2 < 8) {
          res.push([sIndex + 2, sIdx - 1]);
        }
        if (sIdx - 2 >= 0) {
          res.push([sIndex + 1, sIdx - 2]);
        }
      }

      sIndex = index;
      sIdx = idx;
      //bottom-left
      if (sIndex + 1 < 8 && sIdx + 1 < 8) {
        if (sIndex + 2 < 8) {
          res.push([sIndex + 2, sIdx + 1]);
        }
        if (sIdx + 2 < 8) {
          res.push([sIndex + 1, sIdx + 2]);
        }
      }
    }
    if (selectedSolider === "King" || selectedSolider === "Queen") {
      //topleft
      sIndex = index;
      sIdx = idx;
      if (sIndex - 1 >= 0 && sIdx - 1 >= 0) {
        res.push([sIndex - 1, sIdx - 1]);
      }
      sIndex = index;
      sIdx = idx;
      //samerow-left
      if (sIndex >= 0 && sIdx - 1 >= 0) {
        res.push([sIndex, sIdx - 1]);
      }
      sIndex = index;
      sIdx = idx;
      //samerow-right
      if (sIndex < 8 && sIdx + 1 < 8) {
        res.push([sIndex, sIdx + 1]);
      }
      sIndex = index;
      sIdx = idx;
      //bottomleft
      if (sIndex < 8 && sIdx - 1 >= 0) {
        res.push([sIndex + 1, sIdx - 1]);
      }
      sIndex = index;
      sIdx = idx;
      //samecolumn-bottom
      if (sIndex + 1 < 8 && sIdx >= 0) {
        res.push([sIndex + 1, sIdx]);
      }
      sIndex = index;
      sIdx = idx;
      //samecolumn-top
      if (sIndex - 1 >= 0 && sIdx >= 0) {
        res.push([sIndex - 1, sIdx]);
      }
      sIndex = index;
      sIdx = idx;
      //topright
      if (sIndex - 1 >= 0 && sIdx + 1 < 8) {
        res.push([sIndex - 1, sIdx + 1]);
      }
      sIndex = index;
      sIdx = idx;
      //bottomright
      if (sIndex + 1 < 8 && sIdx + 1 < 8) {
        res.push([sIndex + 1, sIdx + 1]);
      }
    }
    if (selectedSolider === "Soldier") {
      if (sIndex - 1 >= 0) {
        res.push([sIndex - 1, sIdx]);
        res.push([sIndex - 2, sIdx]);
        //He can attack opponent by moving diagonally one step
        if (sIdx + 1 < 8) {
          res.push([sIndex - 1, sIdx + 1]);
        }
        if (sIdx - 1 >= 0) {
          res.push([sIndex - 1, sIdx - 1]);
        }
      }
    }
    setResult(res);
  };

  return (
    <div id="#main-1">
      <div className="App">
        {chessArr &&
          chessArr.map((e, index) => {
            return (
              <div className="cell-row" key={`cell-row-${index}`}>
                {e &&
                  e.map((el, idx) => {
                    return (
                      <div
                        className="cell-column"
                        key={`cell-row-${index}-cell-column-${idx}`}
                        style={{ backgroundColor: getColor(index, idx) }}
                        onClick={(e) => handleClick(e, index, idx)}
                      ></div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <h1>
        {" "}
        You Selected {selectedSolider || "Nothing"}{" "}
        <img src={getImage()} alt={''} />{" "}
      </h1>
      <div className="soliders">
        <button
          onClick={() => setSelectedSoldier("Rook")}
          style={{ backgroundColor: selectedSolider === "Rook" ? "green" : "" }}
        >
          Rook
        </button>
        <button
          onClick={() => setSelectedSoldier("Knight")}
          style={{
            backgroundColor: selectedSolider === "Knight" ? "green" : ""
          }}
        >
          Knight
        </button>
        <button
          onClick={() => setSelectedSoldier("Bishop")}
          style={{
            backgroundColor: selectedSolider === "Bishop" ? "green" : ""
          }}
        >
          Bishop
        </button>
        <button
          onClick={() => setSelectedSoldier("King")}
          style={{ backgroundColor: selectedSolider === "King" ? "green" : "" }}
        >
          King
        </button>
        <button
          onClick={() => setSelectedSoldier("Queen")}
          style={{
            backgroundColor: selectedSolider === "Queen" ? "green" : ""
          }}
        >
          Queen
        </button>
        <button
          onClick={() => setSelectedSoldier("Soldier")}
          style={{
            backgroundColor: selectedSolider === "Soldier" ? "green" : ""
          }}
        >
          Soldier
        </button>
      </div>
    </div>
  );
}
