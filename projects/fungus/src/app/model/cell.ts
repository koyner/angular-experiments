export abstract class Cell {
  constructor(public colour: string) {}

  abstract get type();
}
