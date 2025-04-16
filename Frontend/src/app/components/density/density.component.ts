import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TreeService } from 'src/app/services/tree.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

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

  onSubmit() {
    if (this.densityForm.invalid) {
      this.errorMessage = 'Molimo ispunite sva polja pravilno.';
      return;
    }

    this.http.post('http://localhost:8080/api/density', this.densityForm.value).subscribe({
      next: () => {
        this.successMessage = 'Podaci su uspješno sačuvani.';
        this.errorMessage = '';
        this.densityForm.reset();
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Greška pri spremanju podataka.';
      }
    });
  }
}
