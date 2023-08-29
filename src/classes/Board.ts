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
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (this.cells[row][column].isMine){
          console.log(`Row ${row} Column ${column}`);
          if(row !== 0 && row !== this.height - 1 && column !== 0 && column !== this.width - 1) {
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row - 1][column - 1].adjacentMines += 1
            this.cells[row - 1][column].adjacentMines += 1
            this.cells[row - 1][column + 1].adjacentMines += 1
            this.cells[row][column + 1].adjacentMines += 1
            this.cells[row + 1][column + 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
            this.cells[row + 1][column - 1].adjacentMines += 1
          }
          if(row === 0 && column === 0) {
            this.cells[row][column + 1].adjacentMines += 1
            this.cells[row + 1][column + 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
          }
          if(row === 0 && column === this.width - 1) {
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row + 1][column - 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
          }
          if(row === this.height - 1 && column === 0) {
            this.cells[row - 1][column].adjacentMines += 1
            this.cells[row - 1][column + 1].adjacentMines += 1
            this.cells[row][column + 1].adjacentMines += 1
          } 
          if(row === this.height - 1 && column === this.width - 1) {
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row - 1][column - 1].adjacentMines += 1
            this.cells[row - 1][column].adjacentMines += 1
          }
          
          if(row === 0 && column !== 0 && column !== this.width - 1) {
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row + 1][column - 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
            this.cells[row + 1][column + 1].adjacentMines += 1
            this.cells[row][column + 1].adjacentMines += 1
          }
          if(row === this.height - 1 && column !== 0 && column !== this.width - 1) {
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row - 1][column - 1].adjacentMines += 1
            this.cells[row - 1][column].adjacentMines += 1
            this.cells[row - 1][column + 1].adjacentMines += 1
            this.cells[row][column + 1]
          }
          if(column === 0 && row !== 0 && row !== this.height - 1) {
            this.cells[row - 1][column].adjacentMines += 1
            this.cells[row - 1][column + 1].adjacentMines += 1
            this.cells[row][column + 1].adjacentMines += 1
            this.cells[row + 1][column + 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
          }
          if(column === this.width - 1 && row !== 0 && row !== this.height - 1) {
            this.cells[row - 1][column].adjacentMines += 1
            this.cells[row - 1][column - 1].adjacentMines += 1
            this.cells[row][column - 1].adjacentMines += 1
            this.cells[row + 1][column - 1].adjacentMines += 1
            this.cells[row + 1][column].adjacentMines += 1
          }
          
        }

      }
    }
  }
}
