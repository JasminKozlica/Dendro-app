import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Tree } from '@app/models/tree.model';
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
  editItem: any = null;
  editItemId: number | null = null;

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
        console.error(this.translate.instant('search-error'), error);
        this.results = [];
        this.searched = true;
      }
    );
  }
  onEdit(item: any) {
  this.editItem = { ...item }; 
  this.editItemId = item.id;
}

onUpdate(): void {
  this.http.put(`/api/density/${this.editItem.id}`, this.editItem).subscribe({
    next: (updated) => {
      const index = this.results.findIndex(r => r.id === this.editItem.id);
      if (index !== -1) {
        this.results[index] = updated;
      }
      this.editItem = null;
      this.editItemId = null;
    },
    error: (err) => {
      console.error(this.translate.instant('update-error'), err);
      alert(this.translate.instant('update-failed'));
    }
  });
}

onDelete(id: number): void {
  if (confirm(this.translate.instant('Delete-confirmation'))) {
    this.http.delete(`/api/density/${id}`).subscribe({
      next: () => {
        this.results = this.results.filter(item => item.id !== id);
      if(this.editItemId === id){
        this.editItemId = null;
        this.editItemId = null;
      }
      },
      error: (err) => {
        console.error(this.translate.instant('Delete-Runtime-Error'), err);
        alert(this.translate.instant('Delete-Failed'));
      }
    });
  }
}
}