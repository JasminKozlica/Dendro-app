import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser'; // Importiere bootstrapApplication
import { appConfig } from './app/app.config'; // Importiere die App-Konfiguration (falls vorhanden)

bootstrapApplication(AppComponent, appConfig) // Bootstrap die Standalone-Komponente mit Konfiguration
  .catch((err) => console.error(err));