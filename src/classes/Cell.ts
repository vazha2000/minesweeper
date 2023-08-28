class Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.isMine=false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0
  }
}