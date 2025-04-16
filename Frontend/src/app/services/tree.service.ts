import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private apiUrl = 'http://localhost:8080/api/species/top';

  constructor(private http: HttpClient) {}

  getTopSpecies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTree(tree: any): Observable<any> {
    return this.http.post('api/tree', tree);
  }
}
