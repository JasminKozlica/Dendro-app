import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Math = Math;
  searchSpecies: string = '';
  searchLocation: string = '';
  results: any[] = [];
  searched: boolean = false;
  densities: any[] = [];
  locations: string[] = [];
  selectedLocation: string = '';
  totalVolume: number =0;

  constructor(private http: HttpClient , 
    private translate: TranslateService
   
  ) {
    translate.addLangs(['en', 'bs', 'de']);
  translate.setDefaultLang('bs');
  }

  
  ngOnInit(): void {
      this.fetchLocations();
  }

  fetchLocations(){
    this.http.get<any[]>('/api/density/search').subscribe(data => {
      const allLocations = data.map(d => d.location.name);  // ➜ samo ime lokacije
      this.locations = Array.from(new Set(allLocations)); 
    });
  }
  fetchByLocation(location: string){
    
    const params = new HttpParams().set('location', location);
    this.selectedLocation = location;
    this.http.get<any[]>(`/api/density/search` , { params }).subscribe(data => {
      this.densities = data;
      this.totalVolume = this.calculateTotalVolume(data);
    });
  }

  

  calculateTotalVolume(data: any[]): number {
    return data.reduce((total, d) => {
      const radius = (d.diameter / 100) / 2;
      const volume = Math.PI * Math.pow(radius, 2) * d.height * d.treeCount;
      return total + volume;
    }, 0);
  }

  onSearch() {
    let params = new HttpParams();

    if (this.searchSpecies) {
      params = params.set('species', this.searchSpecies);
    }
    if (this.searchLocation) {
      params = params.set('location', this.searchLocation);
    }

    this.http.get<any[]>('/api/density/search', { params }).subscribe(
      data => {
        this.results = data;
        this.searched = true;
      },
      error => {
        console.error('Greška pri pretrazi', error);
        this.results = [];
        this.searched = true;
      }
    );
  }
   removeTree(index: number): void {
    this.treesToSave.splice(index, 1);
  }

  onSubmit(): void {
    if (this.treesToSave.length === 0 && this.densityForm.valid) {
      this.addTree();
    }

    if (this.treesToSave.length === 0) {
      this.errorMessage = 'Unesite barem jedno drvo.';
      return;
    }

    // ⚠️ Loop over each and send individual requests (you can replace with a batch endpoint later)
    const saveRequests = this.treesToSave.map(tree =>
      this.densityService.saveDensity(tree)
    );

    Promise.all(saveRequests.map(req => req.toPromise()))
      .then(() => {
        this.successMessage = 'Svi podaci uspješno sačuvani!';
        this.errorMessage = '';
        this.treesToSave = [];
        this.densityForm.reset();
      })
      .catch((error) => {
        console.error('Greška pri slanju podataka:', error);
        this.successMessage = '';
        this.errorMessage = 'Greška pri slanju podataka.';
      });
  }
}