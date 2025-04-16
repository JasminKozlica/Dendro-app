import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchSpecies: string = '';
  searchLocation: string = '';
  results: any[] = [];
  searched: boolean = false;

  constructor(private http: HttpClient) {}

  onSearch() {
    let params = new HttpParams();

    if (this.searchSpecies) {
      params = params.set('species', this.searchSpecies);
    }
    if (this.searchLocation) {
      params = params.set('location', this.searchLocation);
    }

    this.http.get<any[]>('http://localhost:8080/api/density/search', { params }).subscribe(
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
