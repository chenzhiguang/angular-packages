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
import { createFloat } from './helpers/create_float';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';
import { Position, ReorderEvent } from './types';
import { findIndex } from './helpers/find_index';
import { moveItemInArray } from './helpers/move_item_in_array';

@Component({
  selector: 'ng-reorderable',
  templateUrl: './ng-reorderable.component.html',
  styleUrls: ['./ng-reorderable.component.scss'],
})
export class NgReorderable implements OnInit {
  @Input() dataSource = [];
  @Input() floatClassName: string | undefined;
  @Output() reorder = new EventEmitter();

  data = [];
  active = false;
  dragging = false;
  mousedown = false;
  startedAt = { left: 0, top: 0, offsetX: 0, offsetY: 0 };
  activeElement: HTMLDivElement | undefined;
  startedIndex = -1;
  newIndex = -1;
  float: HTMLDivElement | undefined;
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
        this.float = createFloat(this.activeElement, this.floatClassName);
        this.activeElement.className = 'active';
      }
      this.dragging = true;
    }

    if (this.float) {
      this.float.style.left = e.clientX - this.startedAt.offsetX + 'px';
      this.float.style.top = e.clientY - this.startedAt.offsetY + 'px';
    }

    const newIndex = findIndex(
      { left: e.clientX, top: e.clientY },
      this.positions
    );

    moveItemInArray(this.data, this.newIndex, newIndex);
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
    e.stopPropagation();
    e.preventDefault();

    const element = e.currentTarget as HTMLDivElement;
    const position = element.getBoundingClientRect();

    this.startedAt = {
      left: e.clientX,
      top: e.clientY,
      offsetX: e.clientX - position.left,
      offsetY: e.clientY - position.top,
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
    if (this.float) {
      this.float.parentNode?.removeChild(this.float);
    }
  }
}
