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
import { TranslateService } from '@ngx-translate/core';

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
    private treeService: TreeService,
    private translate: TranslateService
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
        console.error(this.translate.instant('error-species-load'), err);
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
  onSubmit(): void {
  if (this.treesToSave.length === 0 && this.densityForm.valid) {
    this.addTree();
  }

  if (this.treesToSave.length === 0) {
    this.errorMessage = this.translate.instant('1tree');
    return;
  }

  const saveRequests = this.treesToSave.map(tree =>
    this.densityService.saveDensity(tree)
  );

  Promise.all(saveRequests.map(req => req.toPromise()))
    .then(() => {
      this.successMessage = this.translate.instant('treescc');
      this.errorMessage = '';
      this.treesToSave = [];
      this.densityForm.reset();
    })
    .catch((error) => {
      console.error(this.translate.instant('treerr'), error);
      this.successMessage = '';
      this.errorMessage = this.translate.instant('treerr');
    });
}


 
}
