import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/components/app.components/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/components/app.components/app.routes';

import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AuthInterceptor } from '@app/auth.interceptor'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    //  App routes
    provideRouter(appRoutes),

    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    // Translation loader setup
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'bs',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    )
  ]
});