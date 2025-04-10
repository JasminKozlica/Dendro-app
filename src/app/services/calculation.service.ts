import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tree } from '../models/tree.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor() {}

  // Smalian's formula (with delay to simulate async behavior)
  calculateVolumeSmalian(tree: Tree): Observable<number> {
    const diameterMeters = tree.diameter / 100;
    const baseArea = Math.PI * Math.pow(diameterMeters / 2, 2);
    const topArea = Math.PI * Math.pow((diameterMeters / 2) / 2, 2);
    const volume = (tree.height / 2) * (baseArea + topArea);
    return of(volume).pipe(delay(1000)); // simulate 1s delay
  }

  // Huber's formula (with delay to simulate async behavior)
  calculateVolumeHuber(tree: Tree): Observable<number> {
    const diameterMeters = tree.diameter / 100;
    const midArea = Math.PI * Math.pow(diameterMeters / 2, 2);
    const volume = midArea * tree.height;
    return of(volume).pipe(delay(1000)); // simulate 1s delay
  }
}
