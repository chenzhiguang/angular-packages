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
import { findChild } from './helpers/find_child';
import { toggleClassName } from './helpers/toggle_class_name';

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
  activeElement: HTMLElement | undefined;
  fromIndex = -1;
  toIndex = -1;
  float: HTMLElement | undefined;
  positions: Position[] = [];

  @ContentChild(NgReorderableItemDirective) child!: NgReorderableItemDirective;
  @HostListener('mousedown', ['$event']) onMouseDown = this.startDragging;
  @HostListener('window:mousemove', ['$event']) onMouseMove = this.onMoving;
  @HostListener('window:mouseup', ['$event']) onMouseUp(): void {
    this.stopDragging(true);
  }

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

  onMoving(e: MouseEvent): void {
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
        toggleClassName(this.activeElement, 'active', true);
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

    moveItemInArray(this.data, this.toIndex, newIndex);
    this.toIndex = newIndex;
  }

  startDragging(e: MouseEvent): void {
    if (this.dataSource.length < 2) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    const child = findChild(
      e.currentTarget as HTMLElement,
      e.target as HTMLElement
    );
    if (!child) {
      return;
    }

    const { index, element } = child;
    const position = element.getBoundingClientRect();

    this.startedAt = {
      left: e.clientX,
      top: e.clientY,
      offsetX: e.clientX - position.left,
      offsetY: e.clientY - position.top,
    };
    this.activeElement = element;
    this.toIndex = index;
    this.fromIndex = index;
    this.mousedown = true;
  }

  stopDragging(emit = false): void {
    if (emit && this.dragging && this.toIndex !== this.fromIndex) {
      this.copyData();
      this.reorder.emit(<ReorderEvent>{
        fromIndex: this.fromIndex,
        toIndex: this.toIndex,
      });
    }

    this.active = false;
    this.mousedown = false;
    this.dragging = false;
    this.toIndex = -1;
    this.positions = [];
    if (this.activeElement) {
      toggleClassName(this.activeElement, 'active', false);
      this.activeElement = void 0;
    }
    if (this.float) {
      this.float.parentNode?.removeChild(this.float);
    }
  }
}
