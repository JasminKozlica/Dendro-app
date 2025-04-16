import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TreeService } from 'src/app/services/tree.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { count } from 'rxjs';

@Component({
  selector: 'app-density',
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf]
})
export class DensityComponent {
  densityForm!: FormGroup;
  treeSpecies: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private treeService: TreeService,
    private http: HttpClient
  ) {
    this.densityForm = this.fb.group({
      species: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(1)]],
      diameter: ['', [Validators.required, Validators.min(1)]],
      count: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required]
    });

    this.loadTopSpecies();
  }

  loadTopSpecies() {
    this.treeService.getTopSpecies().subscribe({
      next: (data: any[]) => this.treeSpecies = data,
      error: () => this.errorMessage = 'Greška pri učitavanju vrsta drveća.'
    });
  }

  treesToSave: any[] = [];

  addTree(){
    if(this.densityForm.valid){
      const formData = this.densityForm.value;
      this.treesToSave.push({
        species: formData.species,
        height: formData.height,
        diameter: formData.diameter,
        treeCount: formData.count,
        locationName: formData.location
      });
      this.densityForm.patchValue({ height:'', diameter:'', count:''})
    }
  }

  onSubmit() {
    if (this.treesToSave.length === 0 && this.densityForm.valid) {
      this.addTree();
    }
  
    this.http.post('http://localhost:8080/api/density/bulk', this.treesToSave).subscribe({
      next: (res) => {
        this.successMessage = "Podaci uspješno sačuvani!";
        this.errorMessage = '';
        this.treesToSave = [];
        this.densityForm.reset();
      },
      error: (err) => {
        this.errorMessage = "Greška pri čuvanju podataka.";
        this.successMessage = '';
      }
    });
  }
  
}
