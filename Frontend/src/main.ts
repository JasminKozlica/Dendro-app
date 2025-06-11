import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/components/app.components/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/components/app.components/app.routes';

import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { JwtInterceptor } from './app/auth/jwt.interceptor'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    //  App routes
    provideRouter(appRoutes),

    //  Register class-based JWT interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    //  Enable DI-compatible interceptors in HttpClient
    provideHttpClient(withInterceptorsFromDi()),

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