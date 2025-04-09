import { Component } from '@angular/core';
import { Tree } from '@models/tree.model';
import { CalculationService } from '../../services/calculation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-input',
  standalone: true,
  templateUrl: './tree-input.component.html',
  styleUrls: ['./tree-input.component.css'],
  imports: [CommonModule, FormsModule],
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
