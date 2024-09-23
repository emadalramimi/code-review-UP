/* eslint-disable */
//reverted

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.Winner();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private symbol: string = '';

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  } 

  get isNotEmpty() {
    return this.symbol !== emptyPlay;
  }

  hasSameSymbolAs(other: Tile) {
    return this.symbol === other.symbol;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  } 
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(new Tile(i, j, emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, emptyPlay)))!; 
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
      .updateSymbol(symbol); 
  }

  public Winner(): string {
    if (this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  public isRowFullWithSameSymbol(row: number): boolean {
    const firstTile = this.TileAt(row, firstColumn);
    const secondTile = this.TileAt(row, secondColumn);
    const thirdTile = this.TileAt(row, thirdColumn);

    return firstTile.isNotEmpty && 
           firstTile.hasSameSymbolAs(secondTile) && 
           secondTile.hasSameSymbolAs(thirdTile);
  }
}


