import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dendro-app';

constructor(private translate: TranslateService) {
  translate.addLangs(['en', 'de','bs' ]);
  translate.setDefaultLang('bs');

  const browserLang = translate.getBrowserLang();
  translate.use(browserLang && browserLang.match(/en|de|bs/) ? browserLang : 'bs');
}
}