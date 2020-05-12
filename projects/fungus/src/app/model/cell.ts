export abstract class Cell {
  protected constructor(
    public colour: string,
    public col: number,
    public row: number,
  ) {}
}
