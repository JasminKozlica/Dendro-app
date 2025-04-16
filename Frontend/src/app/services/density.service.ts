import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ForestDensity {
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
}
