import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";




@Injectable({
    providedIn:'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/auth';
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient) { }

    login(credentials: {username: string; password: string}): Observable<any>{
        return this.http.post(`${this.apiUrl}/login `, credentials);
    }

    register(data: { username: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    saveToken(token: string): void {
        localStorage.setItem('token',token);
        this.loggedIn.next(true);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
    logout(): void {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
    }
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    hasToken(): boolean{
        return !!localStorage.getItem('token');
    }
}