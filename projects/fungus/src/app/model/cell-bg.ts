import {Cell} from './cell';

export class CellBg extends Cell {
  constructor(colour: string) {
    super(colour);
  }

  get type(): string {
    return 'bg';
  }
}
