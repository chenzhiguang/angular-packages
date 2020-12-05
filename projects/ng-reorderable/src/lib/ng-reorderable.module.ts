import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReorderable } from './ng-reorderable.component';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';

@NgModule({
  declarations: [NgReorderable, NgReorderableItemDirective],
  imports: [CommonModule],
  exports: [NgReorderable, NgReorderableItemDirective],
})
export class NgReorderableModule {}
