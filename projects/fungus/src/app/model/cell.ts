export enum CellType {
  fungus = 'fungus',
  bg = 'bg',
}

export abstract class Cell {
  constructor(public colour: string) {}

  abstract get type(): CellType;
}
