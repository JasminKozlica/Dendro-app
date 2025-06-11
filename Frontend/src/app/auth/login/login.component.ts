import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/']); // or to protected route
      },
      error: err => alert('Login failed')
    });
  }
}