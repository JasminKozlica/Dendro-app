import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  role: string;
  password?: string;
  firstname:string;
  lastname:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';


  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: { username: string; password: string; firstname:string; lastname:string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-user`, user);
  }

  updateUser(id: number, user: { username: string; password?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
