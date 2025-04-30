import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-location-overview',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './location-overview.component.html',
  styleUrls: ['./location-overview.component.css']
})
export class LocationOverviewComponent implements OnInit {
  locationsSummary: any[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient,private translate: TranslateService) {}

  ngOnInit(): void {
    this.fetchLocationSummaries();
  }


  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
   
    this.translate.use(selectedLanguage);
  }

  fetchLocationSummaries() {
    this.isLoading = true;
    this.http.get<any[]>('/api/density/overview').subscribe({
      next: (data) => {
        this.locationsSummary = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching overview data:', err);
        this.isLoading = false;
      }
    });
  }
}
