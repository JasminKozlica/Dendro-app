import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/components/app.components/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/components/app.components/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    // Ostali provideri ako ih imaš
  ]
});