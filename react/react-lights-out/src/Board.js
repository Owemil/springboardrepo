import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 31.31 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([])
      for (let l = 0; l < ncols; l++) {
        (Math.random() < chanceLightStartsOn / 100) ?
          initialBoard[i].push(true) : initialBoard[i].push(false)
      }
    }

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {

    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {

      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }

      };

      const boardCopy = oldBoard.map(arr => [...arr])

      flipCell(y, x, boardCopy)
      flipCell(y, x + 1, boardCopy)
      flipCell(y, x - 1, boardCopy)
      flipCell(y + 1, x, boardCopy)
      flipCell(y - 1, x, boardCopy)

      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div className="Winner">You Win!</div>;
  }
  // TODO
  console.log(hasWon())
  // make table board
  return (
    <>
      <table className="Board">
        <tbody>
          {board.map((arr, index) => {
            return <tr key={index} data-row={index}>
              {arr.map((cell, idx) =>
                <Cell
                  flipCellsAroundMe={() => flipCellsAround(`${index}-${idx}`)}
                  isLit={cell}
                  key={`${index}-${idx}`}
                  coord={`${index}-${idx}`}
                />)}
            </tr>
          })}
        </tbody>
      </table>
    </>
  )

  // TODO
}

export default Board;
