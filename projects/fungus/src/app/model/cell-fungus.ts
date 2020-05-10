import {Animatable} from '../util/animate.service';
import {Cell, CellType} from './cell';

export class CellFungus extends Cell implements Animatable {
  private _age: number;
  private readonly _createdAt: number;
  constructor(
    colour: string,
    col: number,
    row: number,
    private _isNode: boolean,
  ) {
    super(colour, col, row);
    this._createdAt = Date.now();
  }

  get type(): CellType {
    return CellType.fungus;
  }

  get isNode(): boolean {
    return this._isNode;
  }

  get age(): number {
    return this._age;
  }

  animate(): void {
    this._age = Date.now() - this._createdAt;
  }
}
