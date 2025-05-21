import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DensityService } from '@app/services/density.service';
import { TreeService } from '@app/services/tree.service';
import { ForestDensity } from '@app/models/density.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { count, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-density',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,TranslateModule],
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.css']
})
export class DensityComponent implements OnInit {
  densityForm: FormGroup;
  treeSpeciesList: string[] = [];
  treesToSave: ForestDensity[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private densityService: DensityService,
    private treeService: TreeService
  ) {
    this.densityForm = this.fb.group({
      species: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(1)]],
      diameter: ['', [Validators.required, Validators.min(1)]],
      treeCount: ['', [Validators.required, Validators.min(1)]],
      locationName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTopSpecies();
  }

  loadTopSpecies(): void {
    this.treeService.getTopSpecies().subscribe({
      next: (data) => {
        this.treeSpeciesList = data.map(d => d.species); // adjust if needed
      },
      error: (err) => {
        console.error('Error loading species:', err);
      }
    });
  }

  addTree(): void {
    if (this.densityForm.invalid) return;

    const newTree: ForestDensity = this.densityForm.value;
    this.treesToSave.push(newTree);
    this.densityForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

 
}
