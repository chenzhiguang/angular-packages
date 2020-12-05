import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgImageInputModule } from 'ng-image-input@dev';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageInputModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgImageInputModule],
})
export class AppCommonModule {}
