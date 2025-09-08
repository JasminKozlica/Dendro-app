import { Component, OnInit } from '@angular/core';
import{ Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit{

  showDropdown = false;
  username: string | null = null;
  constructor(
    private translate: TranslateService,
    private auth:AuthService,
    private router:Router
  ){}

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
  }

  changeUser(){
    this.logout();
  }

  isAdmin(): boolean {
  return this.auth.getRole() === 'ADMIN';
}
ngOnInit(): void {
    this.username = this.auth.getUsername();
  }
}