import {Component, Input} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {FungusService} from '../../fungus/fungus.service';
import {CellFungus} from '../../fungus/model/cell-fungus';
import {RenderService} from '../../render/render.service';
import {Cell} from '../model/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent {
  @Input() cell: Cell;
  constructor(
    private _fungusService: FungusService,
    private _renderer: RenderService
  ) {}

  clicked(): void {
    console.log(this.cell.toString());
    this._fungusService.createFungusAt(this.cell.col, this.cell.row);
  }

  get x(): number {
    return this._renderer.xFor(this.cell);
  }

  get y(): number {
    return this._renderer.yFor(this.cell);
  }

  get w(): number {
    return this._renderer.cellW;
  }

  get h(): number {
    return this._renderer.cellH;
  }

  get colour(): string {
    return this.cell.colour;
  }

  get borderSize(): number {
    return this.isFungusNode() ? 2 : 0;
  }

  get borderColour(): string {
    return this.isFungusNode() ? '#ddd' : this.cell.colour;
  }

  get opacity(): number {
    return this.cell.opacity;
  }

  private isFungusNode(): boolean {
    return this.cell instanceof CellFungus && (this.cell as CellFungus).isNode;
  }
}
