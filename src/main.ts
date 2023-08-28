import { Board } from "./classes/Board";
import { Cell } from "./classes/Cell";
import "./styles/main.scss";

const board = new Board(10, 10, 10);

const mainDiv = document.querySelector("div") as HTMLElement;
const boardDiv = document.createElement("div");
boardDiv.classList.add("board-container");
boardDiv.style.gridTemplateColumns = `repeat(${board.width}, 50px)`
mainDiv?.append(boardDiv);

for (let i = 0; i < board.width; i++) {
  for (let j = 0; j < board.height; j++) {
    const cell = new Cell(i, j);
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell")
    cellDiv.textContent = `${i} ${j}`
    boardDiv.appendChild(cellDiv)
    // cellDiv.addEventListener('click', () => console.log(`cell ${i} ${j} is clicked`))
    cellDiv.addEventListener('click', () => cellDiv.classList.add("clicked"))
    cellDiv.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      cellDiv.classList.add("right-clicked")
    })
  }
}
