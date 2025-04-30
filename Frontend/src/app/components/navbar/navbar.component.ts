import { Component } from '@angular/core';
import{ RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent{
  constructor(private translate: TranslateService){}

  switchLanguage(event: Event){
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
  }
}