import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TreeInputComponent } from '../tree-input/tree-input.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, TreeInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dendro-app';

constructor(private translate: TranslateService) {
  translate.addLangs(['en', 'de']);
  translate.setDefaultLang('de');

  const browserLang = translate.getBrowserLang();
  translate.use(browserLang && browserLang.match(/en|de/) ? browserLang : 'de');
}

switchLanguage(lang: string) {
  this.translate.use(lang);
}
}