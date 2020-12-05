import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  OnInit,
} from '@angular/core';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';

@Component({
  selector: 'ng-reorderable',
  templateUrl: './ng-reorderable.component.html',
  styleUrls: ['./ng-reorderable.component.scss'],
})
export class NgReorderableComponent implements OnInit, AfterContentInit {
  @Input() dataSource = [];

  @ContentChild(NgReorderableItemDirective) child!: NgReorderableItemDirective;

  constructor() {
    //
  }

  ngOnInit(): void {
    console.log(this.dataSource);
  }

  ngAfterContentInit(): void {
    //
  }

  startDragging(e: MouseEvent): void {
    //
  }
}
