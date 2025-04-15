import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tree } from "@app/models/tree.model";
@Injectable({
    providedIn:'root',
})

export class TreeService {
    private apiUrl = 'http://localhost:8080/api/trees';

    constructor(private http: HttpClient) {}

    getTrees(): Observable<Tree[]>{
        return this.http.get<Tree[]>(this.apiUrl)
    }

    createTree(tree: Tree): Observable<Tree>{
        return this.http.post<Tree>(this.apiUrl, tree);
    }
    getTopSpecies(): Observable<any[]>{
        return this.http.get<any[]>('http://8080/api/species/top');
    }
    addTree(tree: Tree): Observable<Tree>{
        return this.http.post<Tree>(this.apiUrl, tree);
    }
}