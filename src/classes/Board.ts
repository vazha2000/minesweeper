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
    this.cells = []

    this.initializeCells()
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
}