import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule,TranslateModule]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;
  constructor(private auth: AuthService, private router: Router) {}

 

  onLogin(): void {
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: res => {
        this.auth.saveToken(res.accessToken);
        localStorage.setItem('refreshToken' , res.refreshToken);

        this.errorMessage = null;
        this.router.navigate(['/search']);
      },
      error: err => {
        this.errorMessage = 'Login failed. Please check your username and password. ';
        console.error('Login error: ',err); 
      }
    });
  }

  getToken(): string | null {
  return localStorage.getItem('token');
}


 
}