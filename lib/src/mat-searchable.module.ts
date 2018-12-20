import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSearchableDirective } from './mat-searchable.directive';
import { MatSearchableItemDirective } from './mat-searchable-item.directive';
import { MatSearchableInputComponent } from './mat-searchable-input.component';

@NgModule({
  declarations: [
    MatSearchableDirective,
    MatSearchableItemDirective,
    MatSearchableInputComponent
  ],
  exports: [
    MatSearchableDirective,
    MatSearchableItemDirective,
    MatSearchableInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MatSearchableModule { }
