export enum CellType {
  fungus = 'fungus',
  bg = 'bg',
}

export abstract class Cell {
  constructor(public colour: string, public col: number, public row: number) {}

  abstract get type(): CellType;
}
