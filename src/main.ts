import { Board } from "./classes/Board";
import { Cell } from "./classes/Cell";
import "./styles/main.scss";

const board = new Board(10, 10, 10);

const mainDiv = document.querySelector("div") as HTMLElement;
const boardDiv = document.createElement("div");
boardDiv.classList.add("board-container");
boardDiv.style.gridTemplateColumns = `repeat(${board.width}, 50px)`;
mainDiv?.append(boardDiv);


for (let row = 0; row < board.height; row++) {
  for (let col = 0; col < board.width; col++) {
    const cell = board.cells[row][col]; 
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = `${cell.adjacentMines} ${cell.isMine}`;
    // cellDiv.textContent = `${row} ${col}`
    cellDiv.addEventListener("click", () => cellDiv.classList.add("clicked"));
    cellDiv.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      cellDiv.classList.add("right-clicked");
    });
    boardDiv.appendChild(cellDiv);
  }
}
