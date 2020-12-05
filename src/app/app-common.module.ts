import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgImageInputModule } from 'ng-image-input@dev';
import { NgReorderableModule } from 'ng-reorderable@dev';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageInputModule,
    NgReorderableModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgImageInputModule],
})
export class AppCommonModule {}
