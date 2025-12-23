import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule , TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){}
  ngOnInit(): void {
      this.profileForm = this.fb.group({
        username: ['',[Validators.required, Validators.minLength(2)]],
        firstName: ['',[Validators.required, Validators.minLength(2)]],
        lastName: ['',[Validators.required, Validators.minLength(2)]],
        password: ['',[Validators.required, Validators.minLength(6)]],
      });

  }
  onSubmit(): void{
    if (this.profileForm.invalid) return;

    this.http.put('http://localhost:8080/api/user/update-profile' ,this.profileForm.value)
    .subscribe({
      next:() => {
        alert('Profile updated successfully!');
        this.router.navigate(['/search']);
      },
      error:(err) => {
        console.error(err);
        alert('There has been mistake during profile update');
      }
    });
  }
}
