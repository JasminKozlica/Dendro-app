import { Component } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dendro-app';
  currentUrl: string ='';

constructor(private translate: TranslateService,public router: Router,private auth: AuthService) {
  translate.addLangs(['en', 'de','bs' ]);
  translate.setDefaultLang('bs');

  const browserLang = translate.getBrowserLang();
  
  translate.use(browserLang && browserLang.match(/en|de|bs/) ? browserLang : 'bs');


      this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
    });
  }

isLoggedIn(): boolean{
  return this.auth.getToken() !== null;
} 

showNavbar(): boolean {
    const currentUrl = this.router.url || '';
    return !['/login', '/register'].includes(currentUrl) && !!this.auth.getToken();
  }

   ngOnInit(): void {
   const token = this.auth.getToken();
   const currentUrl = this.router.url;

   if (token && currentUrl !== '/login') {
    this.router.navigate(['/search']);
   }
  }
}