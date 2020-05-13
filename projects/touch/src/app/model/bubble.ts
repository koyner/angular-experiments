export class Bubble {
  private _reverse = false;

  constructor(
    public xMid: number,
    public yMid: number,
    public speed: number,
    public side: number
  ) {}

  get x(): number {
    return this.xMid - this.side / 2;
  }

  get y(): number {
    return this.yMid - this.side / 2;
  }

  update(): void {
    this.side -= this._reverse ? 0 : this.speed;
  }

  reverse(): void {
    this._reverse = !this._reverse;
  }
}
