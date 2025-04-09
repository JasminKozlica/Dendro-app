import { Injectable } from '@angular/core';
import { Tree } from '../models/tree.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor() {}
  calculateVolume(tree: Tree): number {
    return 0.000048 * tree.diameter * tree.diameter * tree.height;

  }
}