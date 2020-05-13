export class Dist {
  offset?: number;

  constructor(
    public xMid: number,
    public yMid: number,
    public w: number,
    public h: number
  ) {}

  get x(): number {
    return this.xMid - this.w / 2;
  }

  get y(): number {
    return this.yMid - this.h / 2;
  }
}
