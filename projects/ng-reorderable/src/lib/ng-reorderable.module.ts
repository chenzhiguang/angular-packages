import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReorderableComponent } from './ng-reorderable.component';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';

@NgModule({
  declarations: [NgReorderableComponent, NgReorderableItemDirective],
  imports: [CommonModule],
  exports: [NgReorderableComponent, NgReorderableItemDirective],
})
export class NgReorderableModule {}
