import {Cell} from './cell';

export class CellFungus extends Cell {
  constructor(public colour: string, private isNode: boolean) {
    super(colour);
  }

  get type() {
    return 'fungus';
  }
}
