import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TreeInputComponent } from '../tree-input/tree-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,  // 
    FormsModule,   // 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
