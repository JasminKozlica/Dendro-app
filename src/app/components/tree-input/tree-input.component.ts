import { Component, OnInit } from '@angular/core';
import { Tree } from '@models/tree.model';
import { CalculationService } from '../../services/calculation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-input',
  standalone: true,
  templateUrl: './tree-input.component.html',
  styleUrls: ['./tree-input.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TreeInputComponent implements OnInit {
  tree: Tree = {
    species: '',
    diameter: 0,
    height: 0,
  };

  formula: 'smalian' | 'huber' = 'smalian';
  resultVolume: number | null = null;
  loading = false;

  constructor(private calculationService: CalculationService) {}

  ngOnInit(): void {}

  calculate() {
    this.resultVolume = null;
    this.loading = true;

    const calculation$ =
      this.formula === 'smalian'
        ? this.calculationService.calculateVolumeSmalian(this.tree)
        : this.calculationService.calculateVolumeHuber(this.tree);

    calculation$.subscribe((volume: number) => {
      this.resultVolume = volume;
      this.loading = false;
    });
  }
}

