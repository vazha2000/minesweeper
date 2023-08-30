import { Board } from "./classes/Board";
import { Cell } from "./classes/Cell";
import "./styles/main.scss";

const board = new Board(10, 10, 10);

const mainDiv = document.querySelector("div") as HTMLElement;
const boardDiv = document.createElement("div");
boardDiv.classList.add("board-container");
boardDiv.style.gridTemplateColumns = `repeat(${board.width}, 50px)`;
mainDiv?.append(boardDiv);

const imagePaths: string[] = [
  "assets/one.png",
  "assets/two.png",
  "assets/three.png",
  "assets/four.png",
  "assets/five.png",
  "assets/six.png",
  "assets/seven.png",
  "assets/eight.png",
];

const adjacentMinesToImageIndex = new Map<number, number>([
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 4],
  [6, 5],
  [7, 6],
  [8, 7],
]);

let gameIsOver = false;

function revealAllMines() {
  gameIsOver = true;
  for (let row = 0; row < board.height; row++) {
    for (let col = 0; col < board.width; col++) {
      const cell = board.cells[row][col];
      const cellDiv = boardDiv.children[row * board.width + col] as HTMLElement;

      if (cell.isMine && !cell.isFlagged) {
        if (!cell.isRevealed) {
          const bomb = document.createElement("img");
          bomb.classList.add("bomb");
          bomb.setAttribute("src", "assets/bomb.png");
          cellDiv.append(bomb);
        }
        cellDiv.classList.add("clicked");
      }
    }
  }
}





for (let row = 0; row < board.height; row++) {
  for (let col = 0; col < board.width; col++) {
    const cell = board.cells[row][col];
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");

    cellDiv.addEventListener("click", () => {
      if (cell.isFlagged || cell.isRevealed || gameIsOver) {
        return;
      }
      if (!cell.isRevealed) {
        if (cell.isMine) {
          revealAllMines();
          const playAgain = document.createElement("button");
          playAgain.textContent = "Play Again";
          playAgain.classList.add("playAgain");
          mainDiv.append(playAgain);

          playAgain.addEventListener("click", () => {
            gameIsOver = false;
          })
        } else {
          if (cell.adjacentMines !== 0) {
            const imageIndex = adjacentMinesToImageIndex.get(
              cell.adjacentMines
            );
            if (imageIndex !== undefined) {
              const adjacentNumberImg = document.createElement("img");
              adjacentNumberImg.classList.add("adjacentNumberImg");
              adjacentNumberImg.setAttribute("src", imagePaths[imageIndex]);
              cellDiv.append(adjacentNumberImg);
            }
          }
        }
        cell.isRevealed = true;
        cellDiv.classList.add("clicked");
      }
    });
    cellDiv.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (!cell.isRevealed && !cell.isFlagged) {
        const flag = document.createElement("img");
        flag.classList.add("flag");
        flag.setAttribute("src", "assets/flag.png");
        cellDiv.append(flag);
        cell.isFlagged = true;
      } else if (!cell.isRevealed && cell.isFlagged) {
        const existingFlag = cellDiv.querySelector(".flag");
        if (existingFlag) {
          cellDiv.removeChild(existingFlag as Element);
          cell.isFlagged = false;
        }
      }
    });
    boardDiv.appendChild(cellDiv);
  }
}
