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

  constructor(private auth: AuthService, private router: Router) {}

 

  onLogin(): void {
    localStorage.removeItem('token');
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/search']); // or to protected route
      },
      error: err => {
        localStorage.removeItem('token');
        alert('Login failed') }
    });
  }
  ngOnInit(): void {
    if(this.auth.getToken()){
      this.router.navigate(['/search']);
    }
  }
}