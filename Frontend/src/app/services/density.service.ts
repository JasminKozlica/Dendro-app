import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ForestDensity } from "@app/models/density.model";

export interface ForestDensitys {
    species: string;
    height: number;
    diameter: number;
    count: number;
    location: string;
}
@Injectable({ providedIn: 'root'})
export class DensityService {
    private apiUrl = 'http://localhost:8080/api/density';

    constructor(private http: HttpClient ) {}

    saveDensity(data: ForestDensity): Observable<ForestDensity>{
        return this.http.post<ForestDensity>(this.apiUrl, data);
    }
    updateDensity(id: number, updatedDensity: ForestDensity): Observable<ForestDensity> {
        return this.http.put<ForestDensity>(`${this.apiUrl}/${id}`, updatedDensity);
      }
    
      deleteDensity(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
}
