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

  constructor(private http: HttpClient , private translate: TranslateService) {
    translate.addLangs(['en', 'bs', 'de']);
  translate.setDefaultLang('bs');
  }

  
  ngOnInit(): void {
      this.fetchLocations();
  }

  fetchLocations(){
    this.http.get<string[]>('/api/density/search').subscribe(data => {
      this.locations = data;
    });
  }

  fetchByLocation(location: string){
    this.selectedLocation = location;
    this.http.get<any[]>('/api/density/by-location/${location}').subscribe(data => {
      this.densities = data;
      this.totalVolume = this.calculateTotalVolume();
    });
  }

  totalVolume: number = this.calculateTotalVolume();
  

  calculateTotalVolume(): number {
    return this.densities.reduce((total, d) => {
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
}
