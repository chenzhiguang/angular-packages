import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ng-reorderable-item]',
})
export class NgReorderableItemDirective {
  // TODO: Fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public templateRef: TemplateRef<any>) {}
}
