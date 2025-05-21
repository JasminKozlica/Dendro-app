import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from '@app/models/tree.model';
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
   deleteTree(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTree(id: number, updatedTree: Tree): Observable<Tree> {
    return this.http.put<Tree>(`${this.apiUrl}/${id}`, updatedTree);
  }
}
