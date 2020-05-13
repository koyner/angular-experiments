import {Injectable} from '@angular/core';

import {Bubble} from '../model/bubble';
import {Dist} from '../model/dist';

@Injectable({
  providedIn: 'root'
})
export class DistService {
  dists: Dist[][] = [];
  distFurthest: Dist;
  private readonly _distDivs = 20;

  constructor() {
    for (let j = 0; j < this._distDivs; j++) {
      const h = 1 / this._distDivs;
      const y = j * h;
      for (let k = 0; k < this._distDivs; k++) {
        if (k === 0) {
          this.dists[j] = [];
        }
        const w = 1 / this._distDivs;
        const x = k * w;
        this.dists[j][k] = new Dist(x + w / 2, y + h / 2, w, h);
      }
    }
  }

  updateDistMatrix(bubbles: Bubble[]): void {
    let dFurthest = null;
    this.dists.forEach(dRow => {
      dRow.forEach(d => {
        let distToBubble = -1;
        bubbles.forEach(b => {
          const dX = Math.abs(b.xMid - d.xMid);
          const dY = Math.abs(b.yMid - d.yMid);
          const distToBubbleCurrent = Math.max(
            0,
            Math.sqrt(dX * dX + dY * dY) - b.side / 2
          );
          if (distToBubble === -1 || distToBubbleCurrent < distToBubble) {
            distToBubble = distToBubbleCurrent;
          }
        });
        const distToEdgeX = Math.min(1 - d.xMid, d.xMid);
        const distToEdgeY = Math.min(1 - d.yMid, d.yMid);
        const distToEdge = Math.min(distToEdgeY, distToEdgeX);
        d.offset =
          distToBubble === -1 ? distToEdge : Math.min(distToBubble, distToEdge);
        if (!dFurthest || d.offset > dFurthest.offset) {
          dFurthest = d;
        }
      });
    });
    this.distFurthest = dFurthest;
  }
}
