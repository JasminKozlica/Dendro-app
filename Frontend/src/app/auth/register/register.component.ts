import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  standalone:true,
  selector:'app-register',
  templateUrl:'./register.component.html',
  styleUrls:['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent{
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService,private router: Router) {}

  onRegister(): void {
    if(this.password !== this.confirmPassword){
      alert('Passwords do not match');
      return;
    }

    this.auth.register({ username: this.username, password: this.password }).subscribe({
     next:() => {
      alert('Registration successful. Please Login.');
      this.router.navigate(['/login']);
     },
     error: () => alert('Registration failed') 
    });
  }
}