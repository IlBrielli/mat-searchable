import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';

import { MatSearchableModule } from '@bl4y/mat-searchable';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,

    MatSearchableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
