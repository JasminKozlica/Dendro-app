import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TreeInputComponent } from './components/tree-input/tree-input.component';
import { SearchComponent } from './components/search/search.component';
import { DensityComponent } from './components/density/density.component';

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    TreeInputComponent,
    SearchComponent,
    DensityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
