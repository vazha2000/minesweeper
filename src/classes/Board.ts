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
  }
}