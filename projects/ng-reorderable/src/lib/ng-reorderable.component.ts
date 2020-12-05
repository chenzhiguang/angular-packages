import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { getPositions } from './helpers/get_positions';
import { createIndicator } from './helpers/create_indicator';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';
import { Position, ReorderEvent } from './types';
import { findIndex } from './helpers/find_index';

@Component({
  selector: 'ng-reorderable',
  templateUrl: './ng-reorderable.component.html',
  styleUrls: ['./ng-reorderable.component.scss'],
})
export class NgReorderable implements OnInit {
  @Input() dataSource = [];
  @Output() reorder = new EventEmitter();
  data = [];

  active = false;
  dragging = false;
  mousedown = false;
  startedAt = { left: 0, top: 0 };
  activeElement: HTMLDivElement | undefined;
  startedIndex = -1;
  newIndex = -1;
  indicator: HTMLDivElement | undefined;
  positions: Position[] = [];

  @HostListener('window:mousemove', ['$event']) onMouseMove(
    e: MouseEvent
  ): void {
    if (!this.mousedown) {
      return;
    }

    if (!this.active) {
      if (
        Math.abs(e.clientY - this.startedAt.top) > 10 ||
        Math.abs(e.clientX - this.startedAt.left) > 10
      ) {
        this.active = true;
      }
      return;
    }

    if (!this.dragging) {
      this.positions = getPositions(
        this.elementRef.nativeElement as HTMLElement
      );
      if (this.activeElement) {
        this.indicator = createIndicator(this.activeElement);
      }
      this.dragging = true;
    }

    if (this.indicator) {
      this.indicator.style.left = e.clientX + 3 + 'px';
      this.indicator.style.top = e.clientY + 3 + 'px';
    }
    const newIndex = findIndex(
      { left: e.clientX, top: e.clientY },
      this.positions
    );

    this.data.splice(newIndex, 0, this.data.splice(this.newIndex, 1)[0]);
    this.newIndex = newIndex;
  }

  @HostListener('window:mouseup', ['$event']) onMouseUp(): void {
    this.stopDragging(true);
  }

  @ContentChild(NgReorderableItemDirective) child!: NgReorderableItemDirective;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.copyData();
  }

  update(): void {
    this.copyData();
    this.dragging && this.stopDragging();
  }

  copyData(): void {
    this.data = [...this.dataSource];
  }

  startDragging(index: number, e: MouseEvent): void {
    if (this.dataSource.length < 2) {
      return;
    }

    const element = e.currentTarget as HTMLDivElement;
    element.className = 'active';

    this.startedAt = {
      left: e.clientX,
      top: e.clientY,
    };
    this.activeElement = element;
    this.newIndex = index;
    this.startedIndex = index;
    this.mousedown = true;
  }

  stopDragging(emit = false): void {
    if (emit && this.dragging && this.newIndex !== this.startedIndex) {
      this.copyData();
      this.reorder.emit(<ReorderEvent>{
        oldIndex: this.startedIndex,
        newIndex: this.newIndex,
      });
    }

    this.active = false;
    this.mousedown = false;
    this.dragging = false;
    this.newIndex = -1;
    this.positions = [];
    if (this.activeElement) {
      this.activeElement.className = '';
      this.activeElement = void 0;
    }
    if (this.indicator) {
      this.indicator.parentNode?.removeChild(this.indicator);
    }
  }
}
