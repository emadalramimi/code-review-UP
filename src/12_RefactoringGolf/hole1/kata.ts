/* eslint-disable */

const row0 = 0;
const row1 = 1;
const row2 = 2;
const col0 = 0;
const col1 = 1;
const col2 = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public makeMove(symbol: string, x: number, y: number): void {
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
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private symbol: string = ' ';

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isNotEmpty() {
    return this.Symbol !== emptyPlay;
  }

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
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
    for (let x = row0; x <= row2; x++) {
      for (let y = col0; y <= col2; y++) {
        this._plays.push(new Tile(x, y, emptyPlay));
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

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(row0) && this.isRowFullWithSameSymbol(row0)) {
      return this.TileAt(row0, col0)!.Symbol;
    }

    if (this.isRowFull(row1) && this.isRowFullWithSameSymbol(row1)) {
      return this.TileAt(row1, col0)!.Symbol;
    }

    if (this.isRowFull(row2) && this.isRowFullWithSameSymbol(row2)) {
      return this.TileAt(row2, col0)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.TileAt(row, col0)!.isNotEmpty &&
      this.TileAt(row, col1)!.isNotEmpty &&
      this.TileAt(row, col2)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TileAt(row, col0)!.hasSameSymbolAs(this.TileAt(row, col1)!) &&
      this.TileAt(row, col2)!.hasSameSymbolAs(this.TileAt(row, col1)!)
    );
  }
}
