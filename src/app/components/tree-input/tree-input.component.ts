import { Component } from '@angular/core';
import { Tree } from 'src/app/models/tree.model'; 
import { CalculationService } from '../../services/calculation.service';

@Component({
  selector: 'app-tree-input',
  templateUrl: './tree-input.component.html',
  styleUrls: ['./tree-input.component.css']
})
export class TreeInputComponent {
  tree: Tree = {
    species: '',   
    diameter: 0,
    height: 0
  };

  resultVolume: number | null = null;

  constructor(private calculationService: CalculationService) {}

  calculate() {
    this.resultVolume = this.calculationService.calculateVolume(this.tree);
  }
}
