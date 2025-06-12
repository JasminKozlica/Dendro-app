import { Component } from '@angular/core';
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
export class NavbarComponent{

  showDropdown = false;
  
  constructor(private translate: TranslateService,private auth:AuthService,private router:Router){}

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  changeUser(){
    this.logout();
  }
}