export enum CellType {
  wall,
  fungus,
  bg
}

export abstract class Cell {
  protected constructor(
    public colour: string,
    public col: number,
    public row: number
  ) {}

  toString(): string {
    return `${this.col}, ${this.row}, ${this.colour}`;
  }

  abstract get type(): CellType;
}
