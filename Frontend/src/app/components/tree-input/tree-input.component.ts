import { Component, OnInit } from '@angular/core';
import { Tree } from '@models/tree.model';
import { CalculationService } from '../../services/calculation.service';
import { TreeService } from 'src/app/services/tree.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
console.log('TreeInputComponent loaded from module');
@Component({
  selector: 'app-tree-input',
  standalone: true,
  templateUrl: './tree-input.component.html',
  styleUrls: ['./tree-input.component.css'],
  imports: [CommonModule, FormsModule,TranslateModule]  
})
export class TreeInputComponent implements OnInit {
  tree: Tree = {
    species: '',
    diameter: 0,
    height: 0,
    quantity: 1
  };

  formula: 'smalian' | 'huber' = 'smalian';
  resultVolume: number | null = null;
  loading = false;

  topSpecies: { species: string; description: string }[] = [];

  constructor(
    private calculationService: CalculationService,
    private treeService: TreeService
  ) {}

  ngOnInit(): void {
    this.treeService.getTopSpecies().subscribe((data: any) => {
      this.topSpecies = data;
    });
  }

  submitTree() {
    this.treeService.addTree(this.tree).subscribe(() => {
      alert('Drvo je uspješno uneseno.');
    });
  }

  calculate() {
    this.resultVolume = null;
    this.loading = true;

    const calculation$ =
      this.formula === 'smalian'
        ? this.calculationService.calculateVolumeSmalian(this.tree)
        : this.calculationService.calculateVolumeHuber(this.tree);

    calculation$.subscribe((volume: number) => {
      const quantity = this.tree.quantity ?? 1;
      this.resultVolume = volume * quantity;
      this.loading = false;
    });
  }

  
}
