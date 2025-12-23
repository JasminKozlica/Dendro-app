import { Injectable } from "@angular/core";
import { Observable,BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{accessToken: string; refreshToken: string }>(`${this.apiUrl}/login`, 
      credentials
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
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

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
 private decodeToken(): any | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error decoding token", e);
    return null;
  }
}

getRole(): string | null {
  const payload = this.decodeToken();
  return payload?.role || null;
}

isAdmin(): boolean {
  return this.getRole() === 'ADMIN';
}


 getUsername(): string | null {
    const token = localStorage.getItem('token'); // ili sessionStorage
    if (!token) return null;

    try {
      const decoded: any = this.decodeToken();
      return decoded.sub || decoded.username || null; // zavisi šta backend šalje
    } catch (e) {
      return null;
    }
  }

}
