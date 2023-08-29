import { Cell } from "./Cell";

export class Board {
  width: number;
  height: number;
  mines: number;
  cells: Cell[][];

  constructor(width: number, height: number, mines: number) {
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.cells = [];

    this.initializeCells();
    this.placeMines();
    this.calculateAdjacentMines();
  }

  private initializeCells(): void {
    for (let row = 0; row < this.height; row++) {
      const rowArray: Cell[] = [];
      for (let col = 0; col < this.width; col++) {
        rowArray.push(new Cell(col, row));
      }
      this.cells.push(rowArray);
    }
  }

  private placeMines(): void {
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; ++column) {
        let randomNumberI = Math.floor(Math.random() * 10);
        let randomNumberJ = Math.floor(Math.random() * 10);
        if (this.mines !== 0 && this.cells[randomNumberI][randomNumberJ].isMine === false) {
          this.cells[randomNumberI][randomNumberJ].isMine = true;
          this.mines--;
        }
      }
    }
  }

  private calculateAdjacentMines(): void {
    const offsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
  
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        let currentCell = this.cells[row][column];
  
        if (currentCell.isMine) {
          for (const [rowOffset, colOffset] of offsets) {
            const newRow = row + rowOffset;
            const newCol = column + colOffset;
  
            if (
              newRow >= 0 && newRow < this.height &&
              newCol >= 0 && newCol < this.width
            ) {
              this.cells[newRow][newCol].adjacentMines += 1;
            }
          }
        }
      }
    }
  }
}
